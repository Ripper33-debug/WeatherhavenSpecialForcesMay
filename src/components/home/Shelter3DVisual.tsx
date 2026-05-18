"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconX } from "@tabler/icons-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { trackEvent } from "@/lib/analytics";
import {
  getShelterZone,
  SHELTER_ZONES,
  type ShelterZone,
  type ShelterZoneId,
} from "@/lib/shelterZones";

export type ShelterViewMode = "shelter" | "power" | "field";

type ZoneMesh = {
  mesh: THREE.Mesh;
  glow: THREE.Mesh;
  material: THREE.MeshBasicMaterial;
  glowMaterial: THREE.MeshBasicMaterial;
  zoneId: ShelterZoneId;
  structural?: boolean;
};

type TooltipState = { x: number; y: number; zone: ShelterZone } | null;

const GOLD = 0xc8a96e;
const BG = 0x080a0c;

const CAMERA_PRESETS: Record<
  ShelterViewMode,
  { position: THREE.Vector3; target: THREE.Vector3 }
> = {
  shelter: {
    position: new THREE.Vector3(8, 5, 10),
    target: new THREE.Vector3(0, 1.2, 0),
  },
  power: {
    position: new THREE.Vector3(11, 4.5, 1.5),
    target: new THREE.Vector3(0, 1, 0),
  },
  field: {
    position: new THREE.Vector3(14, 9, 14),
    target: new THREE.Vector3(0, 0.8, 0),
  },
};

const VIEW_HIGHLIGHTS: Record<ShelterViewMode, ShelterZoneId[] | "pulse"> = {
  shelter: ["roof", "walls", "entrance"],
  power: ["ecu", "power"],
  field: "pulse",
};

function createWireMaterial(opacity: number, structural = false) {
  return new THREE.MeshBasicMaterial({
    color: GOLD,
    wireframe: true,
    transparent: true,
    opacity: structural ? Math.max(opacity, 0.5) : opacity,
  });
}

function addZoneMesh(
  zones: ZoneMesh[],
  geometry: THREE.BufferGeometry,
  zoneId: ShelterZoneId,
  position: THREE.Vector3,
  rotation?: THREE.Euler,
  scale?: THREE.Vector3,
  structural = false,
) {
  const material = createWireMaterial(0.3, structural);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  if (rotation) mesh.rotation.copy(rotation);
  if (scale) mesh.scale.copy(scale);
  mesh.userData.zoneId = zoneId;

  const glowMaterial = new THREE.MeshBasicMaterial({
    color: GOLD,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const glow = new THREE.Mesh(geometry.clone(), glowMaterial);
  glow.position.copy(position);
  if (rotation) glow.rotation.copy(rotation);
  if (scale) glow.scale.copy(scale);
  glow.scale.multiplyScalar(1.04);
  glow.visible = false;

  zones.push({ mesh, glow, material, glowMaterial, zoneId, structural });
  return { mesh, glow };
}

function buildShelter(mobile: boolean): { group: THREE.Group; zones: ZoneMesh[] } {
  const shelter = new THREE.Group();
  const zones: ZoneMesh[] = [];

  const w = mobile ? 5 : 6;
  const d = mobile ? 3.2 : 4;
  const h = mobile ? 2.2 : 2.5;
  const wallT = 0.12;

  // Interior / floor
  addZoneMesh(
    zones,
    new THREE.BoxGeometry(w, 0.08, d),
    "interior",
    new THREE.Vector3(0, 0.04, 0),
  );

  // Walls
  addZoneMesh(
    zones,
    new THREE.BoxGeometry(w, h, wallT),
    "walls",
    new THREE.Vector3(0, h / 2, d / 2 + wallT / 2),
  );
  addZoneMesh(
    zones,
    new THREE.BoxGeometry(w, h, wallT),
    "walls",
    new THREE.Vector3(0, h / 2, -d / 2 - wallT / 2),
  );
  addZoneMesh(
    zones,
    new THREE.BoxGeometry(wallT, h, d),
    "walls",
    new THREE.Vector3(w / 2 + wallT / 2, h / 2, 0),
  );
  addZoneMesh(
    zones,
    new THREE.BoxGeometry(wallT, h, d),
    "walls",
    new THREE.Vector3(-w / 2 - wallT / 2, h / 2, 0),
  );

  // Peaked roof — half cylinder along X
  const roofGeom = new THREE.CylinderGeometry(
    d / 2 + 0.15,
    d / 2 + 0.15,
    w + 0.2,
    mobile ? 8 : 14,
    1,
    false,
    0,
    Math.PI,
  );
  addZoneMesh(
    zones,
    roofGeom,
    "roof",
    new THREE.Vector3(0, h, 0),
    new THREE.Euler(0, 0, Math.PI / 2),
    undefined,
    true,
  );

  // Ridge cap
  addZoneMesh(
    zones,
    new THREE.BoxGeometry(w + 0.3, 0.08, 0.15),
    "roof",
    new THREE.Vector3(0, h + d / 2 + 0.05, 0),
    undefined,
    undefined,
    true,
  );

  // Entrance vestibule (front +Z)
  const vestW = mobile ? 1.2 : 1.5;
  addZoneMesh(
    zones,
    new THREE.BoxGeometry(vestW, h * 0.85, 1),
    "entrance",
    new THREE.Vector3(0, h * 0.42, d / 2 + 0.55),
  );

  // ECU (+X)
  addZoneMesh(
    zones,
    new THREE.BoxGeometry(0.75, mobile ? 1 : 1.2, mobile ? 1.1 : 1.4),
    "ecu",
    new THREE.Vector3(w / 2 + 0.55, (mobile ? 0.5 : 0.6), 0.3),
  );

  // Power (-X)
  addZoneMesh(
    zones,
    new THREE.BoxGeometry(0.65, mobile ? 0.9 : 1, mobile ? 1 : 1.2),
    "power",
    new THREE.Vector3(-w / 2 - 0.5, 0.5, -0.2),
  );

  // Guy wires (structural, not interactive)
  if (!mobile) {
    const peak = new THREE.Vector3(0, h + d / 2, 0);
    const stakes: [number, number, number][] = [
      [w / 2 + 0.5, 0, d / 2 + 0.5],
      [-w / 2 - 0.5, 0, d / 2 + 0.5],
      [w / 2 + 0.5, 0, -d / 2 - 0.5],
      [-w / 2 - 0.5, 0, -d / 2 - 0.5],
    ];
    for (const [sx, sy, sz] of stakes) {
      const wireGeom = new THREE.CylinderGeometry(0.015, 0.015, 1, 4);
      const wireMat = createWireMaterial(0.5, true);
      const wire = new THREE.Mesh(wireGeom, wireMat);
      const end = new THREE.Vector3(sx, sy, sz);
      const mid = peak.clone().add(end).multiplyScalar(0.5);
      const len = peak.distanceTo(end);
      wire.scale.set(1, len, 1);
      wire.position.copy(mid);
      wire.lookAt(end);
      wire.rotateX(Math.PI / 2);
      shelter.add(wire);
    }
  }

  for (const z of zones) {
    shelter.add(z.mesh);
    shelter.add(z.glow);
  }

  return { group: shelter, zones };
}

type Props = {
  activeView: ShelterViewMode;
  className?: string;
};

export function Shelter3DVisual({ activeView, className }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [active, setActive] = useState<ShelterZone | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const stateRef = useRef({
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    controls: null as OrbitControls | null,
    shelter: null as THREE.Group | null,
    zones: [] as ZoneMesh[],
    interiorLight: null as THREE.PointLight | null,
    raycaster: new THREE.Raycaster(),
    pointer: new THREE.Vector2(),
    hovered: null as ShelterZoneId | null,
    selected: null as ShelterZoneId | null,
    autoRotate: true,
    userInteracting: false,
    resumeTimer: 0,
    visible: true,
    activeView: "shelter" as ShelterViewMode,
    cameraGoal: CAMERA_PRESETS.shelter.position.clone(),
    cameraTargetGoal: CAMERA_PRESETS.shelter.target.clone(),
    pulseIndex: 0,
    pulseTimer: 0,
    raf: 0,
    mobile: false,
  });

  useEffect(() => {
    stateRef.current.activeView = activeView;
    const preset = CAMERA_PRESETS[activeView];
    stateRef.current.cameraGoal = preset.position.clone();
    stateRef.current.cameraTargetGoal = preset.target.clone();
  }, [activeView]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    stateRef.current.mobile = mobile;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);
    scene.fog = new THREE.Fog(BG, 18, 32);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(8, 5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    renderer.setClearColor(BG);
    canvasRef.current = renderer.domElement;
    canvasRef.current.style.display = "block";
    canvasRef.current.style.width = "100%";
    canvasRef.current.style.height = "100%";
    canvasRef.current.style.touchAction = "none";
    mount.appendChild(canvasRef.current);

    const ambient = new THREE.AmbientLight(0x111111, 1);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(GOLD, 0.3);
    dir.position.set(6, 10, 4);
    scene.add(dir);

    const interiorLight = new THREE.PointLight(0xc8a96e, 0, 8);
    interiorLight.position.set(0, 1.2, 0);
    scene.add(interiorLight);

    const grid = new THREE.GridHelper(24, 24, GOLD, GOLD);
    const gridMat = grid.material as THREE.Material;
    if (Array.isArray(gridMat)) gridMat.forEach((m) => ((m as THREE.Material).opacity = 0.08));
    else (gridMat as THREE.LineBasicMaterial).opacity = 0.08;
    if (Array.isArray(gridMat)) gridMat.forEach((m) => ((m as THREE.Material).transparent = true));
    else (gridMat as THREE.LineBasicMaterial).transparent = true;
    scene.add(grid);

    const { group: shelter, zones } = buildShelter(mobile);
    scene.add(shelter);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.target.set(0, 1.2, 0);
    controls.enablePan = true;
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };

    stateRef.current = {
      ...stateRef.current,
      renderer,
      scene,
      camera,
      controls,
      shelter,
      zones,
      interiorLight,
    };

    const setZoneVisual = (
      zoneId: ShelterZoneId,
      mode: "default" | "hover" | "selected" | "dim" | "pulse",
    ) => {
      for (const z of zones) {
        if (z.zoneId !== zoneId) continue;
        z.glow.visible = mode === "selected";
        if (mode === "hover" || mode === "selected") {
          z.material.opacity = 1;
        } else if (mode === "pulse") {
          z.material.opacity = 0.65;
        } else if (mode === "dim") {
          z.material.opacity = 0.12;
        } else {
          z.material.opacity = z.structural ? 0.5 : 0.3;
        }
      }
    };

    const resetAllZones = () => {
      const s = stateRef.current;
      const sel = s.selected;
      const hov = s.hovered;
      for (const z of zones) {
        if (sel === z.zoneId) {
          setZoneVisual(z.zoneId, "selected");
        } else if (hov === z.zoneId) {
          setZoneVisual(z.zoneId, "hover");
        } else {
          setZoneVisual(z.zoneId, "default");
        }
      }
    };

    const applyViewHighlights = () => {
      const s = stateRef.current;
      const mode = s.activeView;
      const spec = VIEW_HIGHLIGHTS[mode];
      if (spec === "pulse") {
        const id = SHELTER_ZONES[s.pulseIndex % SHELTER_ZONES.length]!.id;
        for (const z of zones) {
          if (z.zoneId === id && !s.selected) setZoneVisual(z.zoneId, "pulse");
          else if (z.zoneId === s.selected) setZoneVisual(z.zoneId, "selected");
          else setZoneVisual(z.zoneId, "dim");
        }
        return;
      }
      for (const z of zones) {
        if (s.selected === z.zoneId) setZoneVisual(z.zoneId, "selected");
        else if (spec.includes(z.zoneId)) setZoneVisual(z.zoneId, "hover");
        else setZoneVisual(z.zoneId, "dim");
      }
    };

    const onResize = () => {
      if (!mount || !stateRef.current.renderer || !stateRef.current.camera) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w < 1 || h < 1) return;
      stateRef.current.camera.aspect = w / h;
      stateRef.current.camera.updateProjectionMatrix();
      stateRef.current.renderer.setSize(w, h, false);
    };

    const onPointerMove = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.camera || !s.renderer) return;
      const rect = s.renderer.domElement.getBoundingClientRect();
      s.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      s.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      s.raycaster.setFromCamera(s.pointer, s.camera);
      const meshes = zones.map((z) => z.mesh);
      const hits = s.raycaster.intersectObjects(meshes, false);
      const hit = hits[0]?.object as THREE.Mesh | undefined;
      const zoneId = hit?.userData.zoneId as ShelterZoneId | undefined;

      if (zoneId) {
        s.hovered = zoneId;
        const zone = getShelterZone(zoneId);
        setTooltip({ x: e.clientX, y: e.clientY, zone });
        s.renderer.domElement.style.cursor = "pointer";
        if (s.activeView !== "field") {
          resetAllZones();
          if (s.selected !== zoneId) setZoneVisual(zoneId, "hover");
        }
        s.interiorLight!.intensity = zoneId === "interior" ? 0.45 : 0;
      } else {
        s.hovered = null;
        setTooltip(null);
        s.renderer.domElement.style.cursor = "grab";
        if (s.activeView === "field") applyViewHighlights();
        else resetAllZones();
        if (!s.selected) s.interiorLight!.intensity = 0;
      }
    };

    const onPointerDown = () => {
      stateRef.current.userInteracting = true;
      stateRef.current.autoRotate = false;
    };

    const onPointerUp = () => {
      stateRef.current.userInteracting = false;
      stateRef.current.resumeTimer = performance.now() + 3000;
    };

    const onClick = () => {
      const s = stateRef.current;
      if (!s.hovered) return;
      const zone = getShelterZone(s.hovered);
      void trackEvent("click", `Shelter zone — ${zone.name}`);
      s.selected = s.hovered;
      setActive(zone);
      setPanelOpen(true);
      for (const z of zones) {
        z.glow.visible = z.zoneId === s.selected;
        if (z.zoneId === s.selected) z.material.opacity = 1;
      }
    };

    const onPointerEnter = () => {
      stateRef.current.autoRotate = false;
    };

    const onPointerLeave = () => {
      stateRef.current.hovered = null;
      setTooltip(null);
      stateRef.current.resumeTimer = performance.now() + 3000;
      if (stateRef.current.activeView === "field") applyViewHighlights();
      else resetAllZones();
    };

    const onVisibility = () => {
      stateRef.current.visible = document.visibilityState === "visible";
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("click", onClick);
    renderer.domElement.addEventListener("pointerenter", onPointerEnter);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(onResize);
    ro.observe(mount);
    onResize();

    let last = performance.now();
    const tick = (now: number) => {
      const s = stateRef.current;
      if (!s.visible || !s.renderer || !s.scene || !s.camera || !s.controls || !s.shelter) {
        s.raf = requestAnimationFrame(tick);
        return;
      }

      const dt = (now - last) / 1000;
      last = now;

      if (
        s.autoRotate &&
        !s.userInteracting &&
        now > s.resumeTimer &&
        s.activeView !== "field"
      ) {
        s.shelter.rotation.y += 0.002;
      }

      if (s.activeView === "field") {
        s.pulseTimer += dt;
        if (s.pulseTimer > 1.4) {
          s.pulseTimer = 0;
          s.pulseIndex = (s.pulseIndex + 1) % SHELTER_ZONES.length;
          applyViewHighlights();
        }
      } else {
        applyViewHighlights();
      }

      s.camera.position.lerp(s.cameraGoal, 0.06);
      s.controls.target.lerp(s.cameraTargetGoal, 0.06);
      s.controls.update();
      s.renderer.render(s.scene, s.camera);
      s.raf = requestAnimationFrame(tick);
    };
    stateRef.current.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("click", onClick);
      renderer.domElement.removeEventListener("pointerenter", onPointerEnter);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      controls.dispose();
      zones.forEach((z) => {
        z.mesh.geometry.dispose();
        z.glow.geometry.dispose();
        z.material.dispose();
        z.glowMaterial.dispose();
      });
      shelter.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
      grid.geometry.dispose();
      const gridM = grid.material;
      if (Array.isArray(gridM)) gridM.forEach((m) => m.dispose());
      else gridM.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  const closePanel = () => {
    setPanelOpen(false);
    window.setTimeout(() => {
      setActive(null);
      stateRef.current.selected = null;
      const s = stateRef.current;
      for (const z of s.zones) {
        z.glow.visible = false;
      }
    }, 280);
  };

  return (
    <div ref={mountRef} className={`relative h-full w-full min-h-[220px] ${className ?? ""}`}>
      {tooltip && (
        <div
          className="pointer-events-none fixed z-[60] max-w-[240px] border border-white/10 bg-[#0d0f12] px-3 py-2 shadow-lg"
          style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}
        >
          <p className="text-[11px] font-semibold tracking-[0.15em] text-[#c8a96e]">{tooltip.zone.name}</p>
          <p className="mt-1 text-[13px] leading-snug text-[#8a9099]">{tooltip.zone.tooltipSpec}</p>
        </div>
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-[55] flex w-full max-w-full flex-col border-l border-white/[0.08] bg-[#0d0f12] transition-transform duration-300 ease-out sm:max-w-[360px] ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!panelOpen}
      >
        {active && (
          <>
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
              <p className="wh-label">{active.name}</p>
              <button
                type="button"
                onClick={closePanel}
                className="p-2 text-[#8a9099] hover:text-white"
                aria-label="Close zone detail"
              >
                <IconX size={20} stroke={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <h3 className="font-display text-xl font-semibold text-white">{active.title}</h3>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[#8a9099]">
                {active.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-[#c8a96e]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={active.learnMoreHref}
                className="mt-8 inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c8a96e] transition-opacity hover:opacity-70"
              >
                Learn More →
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
