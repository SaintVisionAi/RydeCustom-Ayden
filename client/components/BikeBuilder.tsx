import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { ArrowLeft, RotateCw, ShoppingCart } from "lucide-react";

interface Bike {
  id: string;
  name: string;
  color: string;
  frame: string;
  brakes: string;
  exhaust: string;
  wheels: string;
  suspension: string;
  price: number;
}

const BIKES: Bike[] = [
  {
    id: "custom-1",
    name: "Street Legend",
    color: "#1a1a1a",
    frame: "Aluminum",
    brakes: "Brembo",
    exhaust: "Akrapovič",
    wheels: "Warp 9",
    suspension: "KYB",
    price: 2499.99,
  },
  {
    id: "custom-2",
    name: "Mountain Beast",
    color: "#b8860b",
    frame: "Carbon",
    brakes: "Brembo",
    exhaust: "Yoshimura",
    wheels: "Warp 9",
    suspension: "Showa",
    price: 3299.99,
  },
  {
    id: "custom-3",
    name: "Track King",
    color: "#ff6b00",
    frame: "Titanium",
    brakes: "Brembo",
    exhaust: "Two Brothers Racing",
    wheels: "Warp 9",
    suspension: "KYB",
    price: 4199.99,
  },
];

const BRAKE_BRANDS = [
  "Brembo",
  "PUIG",
  "Evotech",
  "Parts Unlimited",
];
const EXHAUST_BRANDS = [
  "Akrapovič",
  "Yoshimura",
  "Two Brothers Racing",
  "Polini",
];
const WHEEL_BRANDS = ["Warp 9", "UMA Racing", "Racing Boy", "Parts Unlimited"];
const SUSPENSION_BRANDS = ["KYB", "Showa", "Parts Unlimited", "Samco Sport"];

function createBikeGeometry(): THREE.Group {
  const group = new THREE.Group();

  // Frame (main body)
  const frameGeometry = new THREE.BoxGeometry(0.4, 1, 1.2);
  const frameMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.y = 0.5;
  group.add(frame);

  // Front wheel
  const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.15, 32);
  const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
  const frontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  frontWheel.rotation.z = Math.PI / 2;
  frontWheel.position.set(0.25, 0.3, 0.8);
  group.add(frontWheel);

  // Back wheel
  const backWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  backWheel.rotation.z = Math.PI / 2;
  backWheel.position.set(0.25, 0.3, -0.6);
  group.add(backWheel);

  // Handlebars
  const handlebarGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 16);
  const handlebarMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
  const handlebars = new THREE.Mesh(handlebarGeometry, handlebarMaterial);
  handlebars.position.set(0, 1.2, 0.7);
  group.add(handlebars);

  // Seat
  const seatGeometry = new THREE.BoxGeometry(0.25, 0.1, 0.4);
  const seatMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
  const seat = new THREE.Mesh(seatGeometry, seatMaterial);
  seat.position.set(0, 0.95, 0.1);
  group.add(seat);

  // Engine block
  const engineGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.5);
  const engineMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a });
  const engine = new THREE.Mesh(engineGeometry, engineMaterial);
  engine.position.set(0.05, 0.4, 0);
  group.add(engine);

  // Exhaust pipe
  const exhaustGeometry = new THREE.CylinderGeometry(0.08, 0.06, 0.6, 16);
  const exhaustMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
  const exhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
  exhaust.rotation.z = Math.PI / 3;
  exhaust.position.set(-0.2, 0.35, -0.3);
  group.add(exhaust);

  // Brake disc (front)
  const brakeGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.02, 32);
  const brakeMaterial = new THREE.MeshPhongMaterial({ color: 0x8b0000 });
  const brakeFront = new THREE.Mesh(brakeGeometry, brakeMaterial);
  brakeFront.rotation.z = Math.PI / 2;
  brakeFront.position.set(-0.2, 0.3, 0.8);
  group.add(brakeFront);

  return group;
}

interface BikeBuilderProps {
  onClose?: () => void;
}

export default function BikeBuilder({ onClose }: BikeBuilderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bikeRef = useRef<THREE.Group | null>(null);
  const [selectedBike, setSelectedBike] = useState<Bike>(BIKES[0]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 2.5);
    camera.lookAt(0, 0.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create bike
    const bike = createBikeGeometry();
    bike.castShadow = true;
    bike.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(bike);
    bikeRef.current = bike;

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (bikeRef.current) {
        bikeRef.current.rotation.y = rotation;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [rotation]);

  const handleRotate360 = () => {
    let currentRotation = rotation;
    const interval = setInterval(() => {
      currentRotation += 0.05;
      if (currentRotation >= rotation + Math.PI * 2) {
        clearInterval(interval);
        setRotation(currentRotation - Math.PI * 2);
      } else {
        setRotation(currentRotation);
      }
    }, 16);
  };

  const handleAddToCart = () => {
    const cartItem = {
      type: "bike",
      name: selectedBike.name,
      specs: selectedBike,
      price: selectedBike.price,
      quantity: 1,
    };
    localStorage.setItem("lastCustomBike", JSON.stringify(cartItem));
    alert(`Added ${selectedBike.name} to cart!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {onClose && (
        <div className="p-4 border-b border-border">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      )}

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* 3D Canvas */}
        <div className="lg:col-span-2">
          <div className="rounded-xl overflow-hidden border-2 border-border bg-white h-full min-h-96">
            <div
              ref={containerRef}
              style={{ width: "100%", height: "500px" }}
            />
            <div className="p-4 bg-slate-50 border-t border-border flex gap-3">
              <button
                onClick={handleRotate360}
                className="flex-1 btn-outline border-primary text-primary py-2 px-4 flex items-center justify-center gap-2"
              >
                <RotateCw className="w-4 h-4" />
                Rotate 360°
              </button>
              <button
                onClick={() =>
                  setRotation((r) => r + Math.PI / 4)
                }
                className="flex-1 btn-outline border-primary text-primary py-2 px-4"
              >
                ↻ Manual
              </button>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Bike Presets</h3>
            <div className="space-y-3">
              {BIKES.map((bike) => (
                <button
                  key={bike.id}
                  onClick={() => setSelectedBike(bike)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    selectedBike.id === bike.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-sm">{bike.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ${bike.price.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Specifications</h3>
            <div className="space-y-3 text-sm">
              <div>
                <label className="text-muted-foreground block">Frame</label>
                <select
                  defaultValue={selectedBike.frame}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-lg"
                >
                  <option>Aluminum</option>
                  <option>Carbon</option>
                  <option>Titanium</option>
                  <option>Steel</option>
                </select>
              </div>

              <div>
                <label className="text-muted-foreground block">Brakes</label>
                <select
                  defaultValue={selectedBike.brakes}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-lg"
                >
                  {BRAKE_BRANDS.map((brand) => (
                    <option key={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-muted-foreground block">Exhaust</label>
                <select
                  defaultValue={selectedBike.exhaust}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-lg"
                >
                  {EXHAUST_BRANDS.map((brand) => (
                    <option key={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-muted-foreground block">Wheels</label>
                <select
                  defaultValue={selectedBike.wheels}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-lg"
                >
                  {WHEEL_BRANDS.map((brand) => (
                    <option key={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-muted-foreground block">
                  Suspension
                </label>
                <select
                  defaultValue={selectedBike.suspension}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-lg"
                >
                  {SUSPENSION_BRANDS.map((brand) => (
                    <option key={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Custom Bike</p>
                <p className="text-3xl font-bold text-primary">
                  ${selectedBike.price.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 font-bold"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
