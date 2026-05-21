"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, RotateCcw } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Midnight Charcoal",
    subtitle: "Detoxifying · Purifying",
    price: "£18",
    weight: "120g",
    scent: "Bergamot, Cedar, Vetiver",
    description:
      "Activated bamboo charcoal draws out impurities deep within the pores, while bergamot and vetiver ground the senses. A bar for the bold.",
    color: "#2C2820",
    accent: "#5A4A38",
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f45e?w=600&q=80",
    imageAlt: "Dark charcoal soap bar",
  },
  {
    id: 2,
    name: "Provençal Bloom",
    subtitle: "Calming · Floral",
    price: "£16",
    weight: "110g",
    scent: "Lavender, Geranium, Neroli",
    description:
      "Sun-dried lavender from the Luberon Valley is folded into a silky shea base. Close your eyes and you're in a field at dusk.",
    color: "#7B6D8D",
    accent: "#9B8DAD",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80",
    imageAlt: "Lavender soap bar",
  },
  {
    id: 3,
    name: "Golden Honey Oat",
    subtitle: "Soothing · Gentle",
    price: "£15",
    weight: "115g",
    scent: "Raw Honey, Vanilla, Chamomile",
    description:
      "Colloidal oatmeal and raw local honey create a bar so gentle it works for the most sensitive of skins. A bedtime ritual.",
    color: "#B8956A",
    accent: "#D4A870",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
    imageAlt: "Honey oat soap bar",
  },
  {
    id: 4,
    name: "Forest Floor",
    subtitle: "Grounding · Earthy",
    price: "£17",
    weight: "120g",
    scent: "Pine Tar, Moss, Sandalwood",
    description:
      "Pine tar and white kaolin clay meet sandalwood and forest moss. The scent of damp earth after rain, bottled in a bar.",
    color: "#3D4A2A",
    accent: "#5A6B3A",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80",
    imageAlt: "Forest green soap bar",
  },
  {
    id: 5,
    name: "Rose & Clay",
    subtitle: "Brightening · Softening",
    price: "£16",
    weight: "110g",
    scent: "Bulgarian Rose, Pink Clay, Ylang Ylang",
    description:
      "Bulgarian rose absolute is suspended in a French pink clay base that tones and softens with every lather. For the ritualist.",
    color: "#C4504A",
    accent: "#D4706A",
    image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&q=80",
    imageAlt: "Rose and clay soap bar",
  },
  {
    id: 6,
    name: "Citrus & Salt",
    subtitle: "Energising · Exfoliating",
    price: "£15",
    weight: "115g",
    scent: "Grapefruit, Sea Salt, Eucalyptus",
    description:
      "Himalayan pink salt crystals and shredded grapefruit zest create a morning ritual that wakes the body and sharpens the mind.",
    color: "#C97B5C",
    accent: "#E0956A",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80",
    imageAlt: "Citrus salt soap bar",
  },
];

interface ModalProps {
  product: (typeof PRODUCTS)[0];
  onClose: () => void;
}

function ProductModal({ product, onClose }: ModalProps) {
  const rotation = useRef(0);
  const [rotDeg, setRotDeg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      rotation.current += 0.5;
      setRotDeg(rotation.current);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Product details for ${product.name}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative bg-cream max-w-2xl w-full overflow-hidden shadow-2xl"
        style={{ borderRadius: "4px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
          aria-label="Close product details"
          data-cursor-hover="true"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Rotating product preview */}
          <div
            className="relative flex items-center justify-center py-16 px-8 overflow-hidden"
            style={{ backgroundColor: `${product.color}15` }}
          >
            <div
              style={{ transform: `perspective(600px) rotateY(${rotDeg}deg)` }}
              className="w-36 h-20 shadow-xl"
            >
              <div
                className="w-full h-full"
                style={{
                  borderRadius: "8px",
                  background: `linear-gradient(135deg, ${product.accent}, ${product.color})`,
                }}
              />
            </div>

            {/* Rotation label */}
            <div className="absolute bottom-4 flex items-center gap-1.5 text-charcoal/30">
              <RotateCcw size={12} />
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase">
                360° View
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-terracotta mb-2">
                {product.subtitle}
              </p>
              <h3 className="font-serif text-3xl text-charcoal mb-1">{product.name}</h3>
              <p className="font-sans text-xs text-charcoal/40 mb-4">
                {product.weight} · Cold Process
              </p>

              <div className="mb-4 pb-4 border-b border-charcoal/10">
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-charcoal/40 mb-1">
                  Scent Profile
                </p>
                <p className="font-serif text-base italic text-charcoal/70">
                  {product.scent}
                </p>
              </div>

              <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className="font-serif text-2xl text-charcoal">{product.price}</span>
              <button
                className="group relative overflow-hidden font-sans text-xs tracking-[0.2em] uppercase px-6 py-3 bg-charcoal text-cream hover:bg-olive transition-colors duration-300"
                data-cursor-hover="true"
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Ritual
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductCollection() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof PRODUCTS)[0] | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const magneticOffsets = useRef<{ x: number; y: number }[]>(
    PRODUCTS.map(() => ({ x: 0, y: 0 }))
  );
  const [offsets, setOffsets] = useState(PRODUCTS.map(() => ({ x: 0, y: 0 })));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    const newOffsets = [...offsets];
    newOffsets[index] = { x, y };
    setOffsets(newOffsets);
  };

  const handleMouseLeave = (index: number) => {
    const newOffsets = [...offsets];
    newOffsets[index] = { x: 0, y: 0 };
    setOffsets(newOffsets);
  };

  return (
    <section
      id="collection"
      className="relative py-section bg-cream px-8 md:px-16"
      aria-label="Product collection"
    >
      {/* Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-terracotta mb-3">
            The Collection
          </p>
          <h2 className="font-serif text-display-lg text-charcoal leading-none">
            Each bar,<br />
            <em>a ceremony.</em>
          </h2>
        </div>
        <p className="font-sans text-sm text-charcoal/50 max-w-xs leading-relaxed md:text-right">
          Six bars, six intentions. Choose the ritual that speaks to your skin and spirit today.
        </p>
      </div>

      {/* Product grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/8"
        role="list"
      >
        {PRODUCTS.map((product, index) => (
          <motion.div
            key={product.id}
            ref={(el) => { cardRefs.current[index] = el; }}
            role="listitem"
            className="relative bg-cream overflow-hidden group cursor-pointer"
            style={{
              transform: `translate(${offsets[index].x}px, ${offsets[index].y}px)`,
              transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => setSelectedProduct(product)}
            data-cursor-hover="true"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setSelectedProduct(product)}
            aria-label={`${product.name} — ${product.price}. Click for details.`}
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Color wash */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-multiply"
                style={{ backgroundColor: product.color }}
              />

              {/* "Add to Ritual" ribbon slides up */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out bg-charcoal/90 backdrop-blur-xs py-3 px-6 flex items-center justify-center gap-3">
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-cream">
                  Add to Ritual
                </span>
                <span className="text-terracotta">→</span>
              </div>
            </div>

            {/* Card content */}
            <div className="p-6">
              {/* Lift shadow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  boxShadow: "0 20px 60px -10px rgba(28,26,23,0.15)",
                }}
              />

              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal/40 mb-2">
                {product.subtitle}
              </p>
              <h3 className="font-serif text-xl text-charcoal mb-1 group-hover:text-terracotta transition-colors duration-300">
                {product.name}
              </h3>
              <p className="font-sans text-xs text-charcoal/40 mb-4 italic">
                {product.scent}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg text-charcoal">{product.price}</span>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-charcoal/30">
                  {product.weight}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
