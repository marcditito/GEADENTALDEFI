import React, { useState, useMemo } from "react";

// ─────────────────────────────────────────────
// LOGO: Imagen del logo de Gea-Dental en base64.
// Se usa en el header, footer y marca de agua.
// ─────────────────────────────────────────────
const LOGO_SRC = "data:image/jpeg;base64,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8QcAAAAAbzAIAAE88gAAAAAAkkUsIMMLbJAAAEQN6BAAAAU88AAAAEAkAAAQAAATfW6NOHXwEQAAAA888ogAAAAQUAAAAAARtEzAjAOAAAlQAc8888IgAEAckAEEgAasipVFGHgDTNrAwc8888skAMcU8ooI0k+13pEB6yMRYdyUc8888888gAQQAAQEQAAAQAwAAAAAgAEE888888884kAAIAQAAAAAAAAAAAAAAEQc888888888osAAEAAAAAAAAAAAAgAQcc88888888888sAAAAAAAAIAIAQAEQYk888888888888888cEIAAAAAAAAAAYEc88888888888888888884EE4Q0AE4s88888888888888888888888888Ag888888888888888/8QAOREAAgEDAQQGBwcEAwAAAAAAAQIDAAQRBRITITEgIkBCUZEQFDJBUmFxBiNDcoGhsTM0YnBzgpL/2gAIAQIBAT8A/wBp2iK9zErctqntrdyNqJTitTiiFvkKAQwx26GTdyo/gwNT3iRGH3hz+1arMDu4h9T2hrm3Q4aVQfmaN9aD8dPOjqFmPx086Op2I5zrTa1p4/Fz/wBTR16xHLeH6LR1+zHcl/8ANN9orPgGEvDlwoa/p8h4zEH5ioby1m/pzIx8AePZ3RHGGQEfOtQ0tFUywjAHMUYq03TIZI97KNoE8B7uFJaWqezAg/SgiDkoFbK+FPbwOMPErfUA1c6FYTA4TYbxWr7RruzJdevGO+OYq11m+tiBt7a+DcasNYtrzC+xJ8J7MQCMGri2McjqRw930qwGLVB9ekQDwNa1owUNcW68O+goEg5Bwa0bWTLi3uD1+4/j2aaOJwBJj5UHggjAMihR7yautbjTqwLtnxPKn1HVD1iWUfl4VZ63LthJ+Kn3gYIpSCAQcg+kgEYNa1p/qlzlB92/EfKgSpBBrR7/ANcthtH7xODdldVcEMAQfcabSbFm2t1x+pqGztYf6cSg+PM0VBGCK1myWB1ljGFfmPA1osxlswpPFDjoazai4sZOHWTrD9PRotybe+TJ6r9U9p1pA1i3+JBr7P52J/qOgyhgwPI1PGY55Y/hYilYqykcxUEgkgif4lB7RrLAWTD4iBWiRbFoWPeY+Q6OqJs6hcfnz51itMObC2/IO0ay23uIRzLZqCIRQxoO6uOjqfWv7g/P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";
const LogoImg = ({ style }) => <img src={LOGO_SRC} alt="Gea-Dental" style={{...style, objectFit:"contain"}} />;

// ─────────────────────────────────────────────
// CATÁLOGO DE PRODUCTOS
// Cada producto tiene: id, nombre, marca, categoria
// y una lista de "variantes" con formato y precio.
// Productos con "esColor:true" tienen selector de tipo (ej: Autocurado/Termocurado).
// Productos con "esDiente:true" abren el selector especial de dientes.
// ─────────────────────────────────────────────
const PRODUCTOS = [
  { id:1, nombre:"Acrílico Cubeta", marca:"Veracril", categoria:"Acrílicos",
    variantes:[{formato:"1000g",precio:28000},{formato:"500g",precio:16990}]},
  { id:3, nombre:"Acrílico Autocurado", marca:"Veracril", categoria:"Acrílicos", esColor:true,
    colores:[
      {color:"Transparente", variantes:[{formato:"1000g",precio:37500},{formato:"500g",precio:19000},{formato:"250g",precio:13500}]},
      {color:"VR-1",         variantes:[{formato:"1000g",precio:37500},{formato:"500g",precio:19000},{formato:"250g",precio:13500}]},
    ]},
  { id:6, nombre:"Acrílico Termocurado", marca:"Veracril", categoria:"Acrílicos", esColor:true,
    colores:[
      {color:"Transparente", variantes:[{formato:"1000g",precio:36500},{formato:"500g",precio:19000},{formato:"250g",precio:13500}]},
      {color:"VR-1",         variantes:[{formato:"1000g",precio:36500},{formato:"500g",precio:19000},{formato:"250g",precio:13500}]},
    ]},
  { id:9,  nombre:"Acrílico de Cubeta", marca:"Marche", categoria:"Acrílicos", variantes:[{formato:"250g",precio:8990}]},
  { id:10, nombre:"Acrílico Corona Termocurado", marca:"Marche", categoria:"Acrílicos", variantes:[{formato:"20g",precio:1800}]},
  { id:11, nombre:"Acrílico Corona Autocurado", marca:"Veracril", categoria:"Acrílicos", variantes:[{formato:"20g",precio:1800}]},
  { id:12, nombre:"Yeso Tipo II (París)", marca:"Velmix", categoria:"Yesos", variantes:[{formato:"1kg",precio:3500}]},
  { id:13, nombre:"Yeso Tipo III (Piedra)", marca:"Durguix", categoria:"Yesos", variantes:[{formato:"1kg",precio:3000}]},
  { id:53, nombre:"Yeso Extra Duro", marca:"-", categoria:"Yesos", variantes:[{formato:"1kg",precio:4990}]},
  { id:14, nombre:"Alginato", marca:"Vigodent", categoria:"Yesos", variantes:[{formato:"454g",precio:6990}]},
  { id:15, nombre:"Monómero", marca:"Veracril", categoria:"Monómeros", esColor:true,
    colores:[
      {color:"Termocurado", variantes:[{formato:"1L",precio:35000},{formato:"500ml",precio:17800},{formato:"250ml",precio:9990}]},
      {color:"Autocurado",  variantes:[{formato:"1L",precio:35000},{formato:"500ml",precio:17800},{formato:"250ml",precio:9990}]},
    ]},
  { id:18, nombre:"Monómero Termocurado", marca:"Marche", categoria:"Monómeros", variantes:[{formato:"75cc",precio:3750},{formato:"210cc",precio:7990}]},
  { id:20, nombre:"Monómero Autocurado", marca:"Marche", categoria:"Monómeros", variantes:[{formato:"75cc",precio:4500},{formato:"210cc",precio:8990}]},
  { id:22, nombre:"Vaso Dappen", marca:"-", categoria:"Instrumentos", variantes:[{formato:"x unidad",precio:800}]},
  { id:23, nombre:"Vaso Dappen Silicona", marca:"-", categoria:"Instrumentos", variantes:[{formato:"Grande",precio:2800},{formato:"Mediano",precio:2100}]},
  { id:24, nombre:"Espátula de Alginato", marca:"-", categoria:"Instrumentos", variantes:[{formato:"x unidad",precio:650}]},
  { id:25, nombre:"Espátula de Cemento", marca:"-", categoria:"Instrumentos", variantes:[{formato:"x unidad",precio:1800}]},
  { id:26, nombre:"Espátula de Lecron", marca:"-", categoria:"Instrumentos", variantes:[{formato:"x unidad",precio:1500}]},
  { id:27, nombre:"Espátula de Yeso", marca:"-", categoria:"Instrumentos", variantes:[{formato:"x unidad",precio:1990}]},
  { id:28, nombre:"Taza de Goma Grande", marca:"-", categoria:"Instrumentos", variantes:[{formato:"x unidad",precio:3000}]},
  { id:29, nombre:"Cuchillo de Yeso", marca:"-", categoria:"Instrumentos", variantes:[{formato:"x unidad",precio:2500}]},
  { id:30, nombre:"Cizalla de Yeso", marca:"-", categoria:"Instrumentos", variantes:[{formato:"x unidad",precio:10500}]},
  { id:46, nombre:"Oclusor", marca:"-", categoria:"Instrumentos", variantes:[{formato:"Talla M",precio:4500},{formato:"Talla L",precio:5500}]},
  { id:31, nombre:"Láminas Protector Bucal", marca:"Bioart", categoria:"Materiales",
    variantes:[{formato:"x unidad",precio:1800},{formato:"5u Verde",precio:7000},{formato:"5u Fucsia",precio:7000},{formato:"5u Surtido",precio:7000}]},
  { id:33, nombre:"Laca Base", marca:"-", categoria:"Materiales", variantes:[{formato:"x unidad",precio:600},{formato:"100 unidades",precio:51200}]},
  { id:35, nombre:"Caja Cera Rosada", marca:"Blasdent", categoria:"Materiales", variantes:[{formato:"x unidad",precio:5800}]},
  { id:48, nombre:"Caja Cera Rosada", marca:"Michydent", categoria:"Materiales", variantes:[{formato:"x unidad",precio:5900}]},
  { id:36, nombre:"Rodetes", marca:"-", categoria:"Materiales", variantes:[{formato:"x unidad",precio:400},{formato:"10 unidades",precio:3000},{formato:"50 unidades",precio:10000}]},
  { id:38, nombre:"Zocaleras", marca:"-", categoria:"Materiales", variantes:[{formato:"x unidad",precio:6600}]},
  { id:39, nombre:"Alambre", marca:"Morelli", categoria:"Materiales",
    variantes:[{formato:"0.6mm/metro",precio:700},{formato:"0.6mm/rollo",precio:8990},{formato:"0.7mm/metro",precio:850},{formato:"0.8mm/metro",precio:1100},{formato:"0.8mm/rollo",precio:8990}]},
  { id:42, nombre:"Cera para Tallado 15g", marca:"Michydent", categoria:"Materiales",
    variantes:[{formato:"Marfil",precio:3500},{formato:"Azul",precio:3500},{formato:"Amarilla",precio:3500},{formato:"Roja",precio:3500}]},
  { id:43, nombre:"Kit PKT", marca:"-", categoria:"Materiales", variantes:[{formato:"5 unidades",precio:7000}]},
  { id:54, nombre:"Polycril", marca:"-", categoria:"Materiales", variantes:[{formato:"454g",precio:5990}]},
  { id:55, nombre:"Pimpollo Silicona", marca:"-", categoria:"Materiales",
    variantes:[{formato:"Amarillo",precio:1350},{formato:"Verde",precio:1350},{formato:"Gris",precio:1350}]},
  { id:56, nombre:"Material Flexible", marca:"-", categoria:"Materiales", variantes:[{formato:"1kg",precio:24990}]},
  { id:57, nombre:"Porta Prótesis", marca:"-", categoria:"Materiales", variantes:[{formato:"x unidad",precio:850},{formato:"10 unidades",precio:8000}]},
  { id:49, nombre:"Dientes de Acrílico", marca:"Michydent", categoria:"Dientes", variantes:[{formato:"x unidad",precio:1600}], esDiente:true},
  { id:44, nombre:"Láminas Rígidas 1.5mm", marca:"Bioart", categoria:"Láminas", variantes:[{formato:"5 unidades",precio:5990}]},
  { id:45, nombre:"Láminas Rígidas 1.5mm", marca:"Ehros", categoria:"Láminas", variantes:[{formato:"15 unidades",precio:19000}]},
  { id:58, nombre:"Caja de Ortodoncia", marca:"-", categoria:"Materiales", variantes:[{formato:"10 unidades",precio:5500}]},
  // ── Endodoncia ──
  { id:59, nombre:"Lima K", marca:"-", categoria:"Endodoncia", variantes:[{formato:"x unidad",precio:4790}]},
  { id:60, nombre:"Cono Gutta", marca:"-", categoria:"Endodoncia", variantes:[{formato:"x unidad",precio:3490}]},
  { id:61, nombre:"Cemento", marca:"-", categoria:"Endodoncia", variantes:[{formato:"x unidad",precio:54900}]},
  { id:50, nombre:"Soldadura Dental", marca:"Morelli", categoria:"Soldadura", variantes:[{formato:"5 metros",precio:42000},{formato:"4 varillas",precio:30000}]},
];

// ─────────────────────────────────────────────
// CONFIGURACIÓN GLOBAL
// CATEGORIAS: generada automáticamente desde los productos.
// COSTO_ENVIO: valor fijo del despacho a domicilio.
// DIENTES_CONFIG: modelos disponibles por tipo de diente.
// DIENTES_COLORES: paleta de colores dentales disponibles.
// ─────────────────────────────────────────────
const CATEGORIAS = ["Todas", ...new Set(PRODUCTOS.map(p => p.categoria))];
const COSTO_ENVIO = 4000;
const DIENTES_CONFIG = {
  "Anterior Superior": ["419","390","468","447","503","470","425","438","T6","448","426","O3"],
  "Anterior Inferior": ["U25","U37","U67","U38","U70","L8"],
  "Posterior Superior": ["32","34"],
  "Posterior Inferior": ["32","34"],
};
const DIENTES_COLORES = ["A1","A2","A3","A3.5","A4","B3","C3","C4","D3"];

// ─────────────────────────────────────────────
// PALETA DE COLORES (C)
// Todos los colores de la app centralizados aquí.
// Verde: color principal de la marca.
// Morado: color secundario/acento.
// Se pasan como prop a los componentes de tarjeta.
// ─────────────────────────────────────────────
const C = {
  verde:"#4aad52", verdeOsc:"#2d7a34", verdeMedio:"#3d9a44",
  verdeClaro:"#e6f7e8", verdePale:"#f2fbf3",
  morado:"#6b3fa0", moradoMedio:"#8b5cbf", moradoClaro:"#ede5f7", moradoPale:"#f5f0fc",
  negro:"#1a1a1a", negroMedio:"#333333",
  bg:"#f0faf4", white:"#ffffff", text:"#1a1a1a", textLight:"#5a7060",
  border:"#c2e0c6", borderMorado:"#d0bfed",
};
// fmt: formatea un número como precio en pesos chilenos. Ej: 1500 → "$1.500"
const fmt = n => "$" + Math.round(n).toLocaleString("es-CL");
// inputBase: estilos base reutilizables para todos los campos de formulario.
const inputBase = { width:"100%", padding:"10px 14px", borderRadius:8, border:"2px solid #c2e0c6", fontSize:14, fontFamily:"inherit", color:"#1a1a1a", background:"#ffffff", outline:"none", boxSizing:"border-box" };

// ─────────────────────────────────────────────
// ESTILOS GLOBALES Y ANIMACIONES CSS
// fadeInUp: entrada suave de tarjetas desde abajo.
// popIn: aparición del badge "✓ Agregado".
// cartBounce: rebote del carrito al agregar un producto.
// slideDown: entrada del carrito al abrirlo.
// letterJump: letras del nombre saltando una a una.
// glowPulse: resplandor del botón de WhatsApp.
// spinBorder: borde giratorio del botón WhatsApp.
// futuristic-header: header oscuro estilo futurista.
// ws-btn-outer: contenedor con borde animado giratorio.
// ─────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes popIn { 0%{transform:scale(0.7);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
    @keyframes cartBounce { 0%,100%{transform:scale(1)} 25%{transform:scale(1.3) rotate(-5deg)} 50%{transform:scale(0.9) rotate(3deg)} 75%{transform:scale(1.1)} }
    @keyframes slideDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes letterJump { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
    @keyframes glowPulse { 0%,100%{box-shadow:0 0 6px 0 rgba(74,173,82,0.5)} 50%{box-shadow:0 0 18px 4px rgba(74,173,82,0.8)} }
    @keyframes borderRun { 0%{stroke-dashoffset:600} 100%{stroke-dashoffset:0} }
    @keyframes scanLine { 0%{top:0%;opacity:0.6} 100%{top:100%;opacity:0} }
    @keyframes neonFlicker { 0%,95%,100%{opacity:1} 96%{opacity:0.6} 98%{opacity:0.9} }
    .card-anim { animation: fadeInUp 0.45s cubic-bezier(0.22,1,0.36,1) both; }
    .card-anim:hover { transform:translateY(-5px) scale(1.01) !important; box-shadow:0 10px 32px rgba(74,173,82,0.18) !important; border-color:rgba(74,173,82,0.6) !important; transition:transform 0.22s ease,box-shadow 0.22s ease,border-color 0.22s ease !important; }
    .btn-press { transition:transform 0.1s ease; }
    .btn-press:active { transform:scale(0.93) !important; }
    .cart-bounce { animation:cartBounce 0.5s cubic-bezier(0.36,0.07,0.19,0.97); }
    .pop-in { animation:popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
    .slide-down { animation:slideDown 0.28s ease both; }
    .glow-pulse { animation:glowPulse 2s ease-in-out infinite; }
    .neon { animation:neonFlicker 4s infinite; }
    .brand-letter { display:inline-block; animation:letterJump 1.2s ease-in-out infinite; }
    .brand-letter:nth-child(1){animation-delay:0.00s} .brand-letter:nth-child(2){animation-delay:0.08s}
    .brand-letter:nth-child(3){animation-delay:0.16s} .brand-letter:nth-child(4){animation-delay:0.24s}
    .brand-letter:nth-child(5){animation-delay:0.32s} .brand-letter:nth-child(6){animation-delay:0.40s}
    .brand-letter:nth-child(7){animation-delay:0.48s} .brand-letter:nth-child(8){animation-delay:0.56s}
    .brand-letter:nth-child(9){animation-delay:0.64s} .brand-letter:nth-child(10){animation-delay:0.72s}
    .futuristic-header { background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 40%,#0d2d14 100%) !important; border-bottom:2px solid #4aad52 !important; box-shadow:0 2px 20px rgba(74,173,82,0.25) !important; }
    .header-grid-bg { position:absolute; inset:0; opacity:0.06; pointer-events:none; background-image:linear-gradient(rgba(74,173,82,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(74,173,82,0.8) 1px,transparent 1px); background-size:24px 24px; }
    .ws-scan { position:absolute; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,rgba(37,211,102,0.7),transparent); animation:scanLine 1.8s linear infinite; pointer-events:none; border-radius:2px; }
    @keyframes spinBorder { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .ws-btn-outer {
      position: relative;
      border-radius: 14px;
      padding: 3px;
      overflow: hidden;
      background: transparent;
    }
    .ws-btn-outer::before {
      content: "";
      position: absolute;
      inset: -50%;
      width: 200%;
      height: 200%;
      background: conic-gradient(
        from 0deg,
        transparent 0deg,
        transparent 240deg,
        #25D366 270deg,
        #7fff7f 300deg,
        #25D366 330deg,
        transparent 360deg
      );
      animation: spinBorder 1.8s linear infinite;
      border-radius: 0;
    }
    .ws-btn-outer::after {
      content: "";
      position: absolute;
      inset: 3px;
      border-radius: 11px;
      background: linear-gradient(90deg,#128c3a,#1da851);
      z-index: 0;
    }
    .ws-btn-inner {
      position: relative !important;
      z-index: 1 !important;
      border-radius: 11px !important;
      background: linear-gradient(90deg,#128c3a,#25D366,#1da851) !important;
    }
  `}</style>
);

// ─────────────────────────────────────────────
// MARCA DE AGUA (fondo detrás de las tarjetas)
// SVG repetido en patrón diagonal con:
// - Letra G (negra) + Letra D (degradado verde)
// - Diente verde dentro de la D
// - Diente morado pequeño arriba (fiel al logo)
// - Texto "gea-dental" debajo
// - Círculo contenedor sutil
// ─────────────────────────────────────────────
const WatermarkBg = () => (
  <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
    <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.06 }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="gdPattern" x="0" y="0" width="260" height="260" patternUnits="userSpaceOnUse" patternTransform="rotate(-15)">

          {/* ── Letra G negra ── */}
          <text x="62" y="115" fontFamily="Georgia,serif" fontSize="88" fontWeight="900" textAnchor="middle" fill="#1a1a1a">G</text>

          {/* ── Letra D degradado verde ── */}
          <defs>
            <linearGradient id="dGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2d7a34"/>
              <stop offset="100%" stopColor="#7ec44f"/>
            </linearGradient>
          </defs>
          <text x="168" y="115" fontFamily="Georgia,serif" fontSize="88" fontWeight="900" textAnchor="middle" fill="url(#dGrad)">D</text>

          {/* ── Diente dentro de D ── */}
          <path d="M152 55 C148 55 143 59 142 65 C141 70 142 75 141 80 C140 85 137 89 137 89 C136 91 138 93 140 92 C142 91 144 87 146 87 C148 87 150 91 152 92 C154 93 156 93 158 92 C160 91 162 87 164 87 C166 87 168 91 170 92 C172 93 174 91 173 89 C173 89 170 85 169 80 C168 75 169 70 168 65 C167 59 162 55 158 55 C156 55 154 55 152 55 Z" fill="#4aad52" opacity="0.9"/>

          {/* ── Diente morado pequeño arriba ── */}
          <path d="M156 32 C154 32 152 34 151 36 C150 38 151 40 150 42 C149 44 148 45 148 45 C147 46 148 47 149 47 C150 47 151 45 152 45 C153 45 154 47 155 47 C156 47 157 47 158 47 C159 47 160 45 161 45 C162 45 163 47 164 47 C165 47 166 46 165 45 C165 45 164 44 163 42 C162 40 163 38 162 36 C161 34 159 32 157 32 Z" fill="#6b3fa0"/>

          {/* ── gea-dental texto abajo ── */}
          <text x="62" y="148" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="400" textAnchor="middle" fill="#1a1a1a" letterSpacing="1">gea-</text>
          <text x="168" y="148" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" textAnchor="middle" fill="#4aad52" letterSpacing="1">dental</text>

          {/* Círculo contenedor sutil */}
          <circle cx="115" cy="95" r="100" fill="none" stroke="#4aad52" strokeWidth="1" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gdPattern)"/>
    </svg>
  </div>
);

// ─────────────────────────────────────────────
// TARJETA DE PRODUCTO CON VARIANTES (VarianteCard)
// Muestra un producto con múltiples formatos/tamaños.
// El cliente selecciona el formato y la cantidad (desde 0).
// El precio cambia según el formato elegido.
// ─────────────────────────────────────────────
const VarianteCard = ({ producto, carrito, onAgregar, C, fmt }) => {
  const [varIdx, setVarIdx] = React.useState(0);
  const [cantidad, setCantidad] = React.useState(0);
  const varActual = producto.variantes[varIdx];
  const key = producto.id + "_" + varActual.formato;
  const enCarrito = !!carrito[key];
  const handleAgregar = () => { if(cantidad===0) return; onAgregar(producto, varActual, cantidad); setCantidad(0); };
  const btnSel = activo => ({ padding:"5px 10px", borderRadius:6, border:"2px solid", borderColor:activo?C.verde:C.border, background:activo?C.verdeClaro:C.white, color:activo?C.verdeOsc:C.textLight, cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"inherit", transition:"all 0.15s" });
  return (
    <div className="card-anim" style={{ background:"rgba(255,255,255,0.93)", borderRadius:12, padding:16, boxShadow:"0 2px 14px rgba(0,0,0,0.08)", border:"2px solid "+(enCarrito?C.verde:C.border), backdropFilter:"blur(4px)", display:"flex", flexDirection:"column", gap:10, transition:"border-color 0.2s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:11, background:C.verdeClaro, color:C.verdeOsc, padding:"3px 8px", borderRadius:4, textTransform:"uppercase", letterSpacing:1, fontWeight:700 }}>{producto.categoria}</span>
        {enCarrito && <span className="pop-in" style={{ fontSize:11, background:C.verde, color:"white", padding:"3px 8px", borderRadius:4, fontWeight:700 }}>✓ Agregado</span>}
      </div>
      <div style={{ flexGrow:1 }}>
        <div style={{ fontWeight:700, fontSize:15, lineHeight:1.35 }}>{producto.nombre}</div>
        {producto.marca!=="-" && <div style={{ fontSize:12, color:C.textLight, marginTop:2 }}>{producto.marca}</div>}
      </div>
      {producto.variantes.length > 1 && (
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:C.negroMedio, marginBottom:5 }}>Formato:</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {producto.variantes.map((v,i) => <button key={i} onClick={()=>setVarIdx(i)} style={btnSel(varIdx===i)}>{v.formato}</button>)}
          </div>
        </div>
      )}
      {producto.variantes.length === 1 && <div style={{ fontSize:12, color:C.textLight }}>{varActual.formato}</div>}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <div style={{ fontSize:21, fontWeight:800, color:C.verdeOsc }}>{fmt(varActual.precio)}</div>
        <div style={{ display:"flex", alignItems:"center", gap:0, border:"2px solid "+C.border, borderRadius:10, overflow:"hidden" }}>
          <button onClick={()=>setCantidad(c=>Math.max(0,c-1))} style={{ width:36,height:36,border:"none",background:C.verdePale,cursor:"pointer",fontSize:18,fontWeight:800,color:"#111",display:"flex",alignItems:"center",justifyContent:"center" }}>−</button>
          <span style={{ minWidth:32,textAlign:"center",fontSize:15,fontWeight:800,color:"#111",padding:"0 4px" }}>{cantidad}</span>
          <button onClick={()=>setCantidad(c=>c+1)} style={{ width:36,height:36,border:"none",background:C.verdePale,cursor:"pointer",fontSize:18,fontWeight:800,color:"#111",display:"flex",alignItems:"center",justifyContent:"center" }}>+</button>
        </div>
      </div>
      <button onClick={handleAgregar} disabled={cantidad===0} className={cantidad>0?"btn-press":""} style={{ background:cantidad===0?"#ccc":C.verde, color:"white", border:"none", borderRadius:8, padding:"10px", cursor:cantidad===0?"not-allowed":"pointer", fontFamily:"inherit", fontSize:13, fontWeight:700, width:"100%", transition:"background 0.2s" }}>
        {cantidad===0?"Selecciona cantidad":"🛒 Agregar al carrito"}
      </button>
      <div style={{ height:3, borderRadius:2, background:"linear-gradient(90deg,"+C.morado+"44,"+C.moradoMedio+"99)" }} />
    </div>
  );
};

// ─────────────────────────────────────────────
// TARJETA CON SELECTOR DE TIPO + FORMATO (ColorVarianteCard)
// Usada para productos con dos dimensiones de elección:
//   1) Tipo/Color (ej: Termocurado / Autocurado)
//   2) Formato (ej: 1L / 500ml / 250ml)
// Botones morados para el tipo, verdes para el formato.
// ─────────────────────────────────────────────
const ColorVarianteCard = ({ producto, carrito, onAgregar, C, fmt }) => {
  const [colorIdx, setColorIdx] = React.useState(0);
  const [varIdx, setVarIdx] = React.useState(0);
  const [cantidad, setCantidad] = React.useState(0);
  const colorActual = producto.colores[colorIdx];
  const varActual = colorActual.variantes[varIdx];
  const key = producto.id+"_"+colorActual.color+"_"+varActual.formato;
  const enCarrito = !!carrito[key];
  const handleAgregar = () => { if(cantidad===0) return; onAgregar({...producto,id:key,nombre:producto.nombre+" "+colorActual.color,variantes:colorActual.variantes}, varActual, cantidad); setCantidad(0); };
  const btnSel = activo => ({ padding:"5px 12px", borderRadius:6, border:"2px solid", borderColor:activo?C.verde:C.border, background:activo?C.verdeClaro:C.white, color:activo?C.verdeOsc:C.textLight, cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"inherit" });
  const btnColor = activo => ({ ...btnSel(false), borderColor:activo?C.morado:C.borderMorado, background:activo?C.moradoClaro:C.white, color:activo?C.morado:C.textLight });
  return (
    <div className="card-anim" style={{ background:"rgba(255,255,255,0.93)", borderRadius:12, padding:16, boxShadow:"0 2px 14px rgba(0,0,0,0.08)", border:"2px solid "+(enCarrito?C.verde:C.border), backdropFilter:"blur(4px)", display:"flex", flexDirection:"column", gap:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:11, background:C.verdeClaro, color:C.verdeOsc, padding:"3px 8px", borderRadius:4, textTransform:"uppercase", letterSpacing:1, fontWeight:700 }}>{producto.categoria}</span>
        {enCarrito && <span className="pop-in" style={{ fontSize:11, background:C.verde, color:"white", padding:"3px 8px", borderRadius:4, fontWeight:700 }}>✓ Agregado</span>}
      </div>
      <div><div style={{ fontWeight:700, fontSize:15 }}>{producto.nombre}</div><div style={{ fontSize:12, color:C.textLight }}>{producto.marca}</div></div>
      <div>
        <div style={{ fontSize:12, fontWeight:700, color:C.negroMedio, marginBottom:5 }}>Tipo:</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{producto.colores.map((c,i)=><button key={i} onClick={()=>{setColorIdx(i);setVarIdx(0);}} style={btnColor(colorIdx===i)}>{c.color}</button>)}</div>
      </div>
      <div>
        <div style={{ fontSize:12, fontWeight:700, color:C.negroMedio, marginBottom:5 }}>Formato:</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{colorActual.variantes.map((v,i)=><button key={i} onClick={()=>setVarIdx(i)} style={btnSel(varIdx===i)}>{v.formato}</button>)}</div>
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <div style={{ fontSize:21, fontWeight:800, color:C.verdeOsc }}>{fmt(varActual.precio)}</div>
        <div style={{ display:"flex", alignItems:"center", gap:0, border:"2px solid "+C.border, borderRadius:10, overflow:"hidden" }}>
          <button onClick={()=>setCantidad(c=>Math.max(0,c-1))} style={{ width:36,height:36,border:"none",background:C.verdePale,cursor:"pointer",fontSize:18,fontWeight:800,color:"#111",display:"flex",alignItems:"center",justifyContent:"center" }}>−</button>
          <span style={{ minWidth:32,textAlign:"center",fontSize:15,fontWeight:800,color:"#111",padding:"0 4px" }}>{cantidad}</span>
          <button onClick={()=>setCantidad(c=>c+1)} style={{ width:36,height:36,border:"none",background:C.verdePale,cursor:"pointer",fontSize:18,fontWeight:800,color:"#111",display:"flex",alignItems:"center",justifyContent:"center" }}>+</button>
        </div>
      </div>
      <button onClick={handleAgregar} disabled={cantidad===0} className={cantidad>0?"btn-press":""} style={{ background:cantidad===0?"#ccc":C.verde,color:"white",border:"none",borderRadius:8,padding:"10px",cursor:cantidad===0?"not-allowed":"pointer",fontFamily:"inherit",fontSize:13,fontWeight:700,width:"100%" }}>
        {cantidad===0?"Selecciona cantidad":"🛒 Agregar al carrito"}
      </button>
      <div style={{ height:3, borderRadius:2, background:"linear-gradient(90deg,"+C.morado+"44,"+C.moradoMedio+"99)" }} />
    </div>
  );
};

// ─────────────────────────────────────────────
// TARJETA ESPECIAL DE DIENTES (DienteCard)
// Permite al cliente elegir:
//   1) Tipo: Anterior Superior / Inferior / Posterior
//   2) Modelo: según el catálogo Michydent
//   3) Color: A1, A2, A3, etc.
//   4) Cantidad
// Valida que se seleccionen las 3 opciones antes de agregar.
// ─────────────────────────────────────────────
const DienteCard = ({ producto, onAgregar, C, fmt }) => {
  const [tipo, setTipo] = React.useState("");
  const [modelo, setModelo] = React.useState("");
  const [color, setColor] = React.useState("");
  const [cantidad, setCantidad] = React.useState(0);
  const [error, setError] = React.useState("");
  const modelos = tipo ? DIENTES_CONFIG[tipo] : [];
  const handleAgregar = () => {
    if(!tipo||!modelo||!color){setError("Selecciona tipo, modelo y color");return;}
    if(cantidad===0){setError("Agrega al menos 1");return;}
    setError("");
    const key=tipo+"|"+modelo+"|"+color;
    onAgregar({...producto,id:49+"_"+key,nombre:"Diente "+tipo+" Mod."+modelo,formato:"Color "+color,cantidad,precio:producto.variantes[0].precio});
    setTipo("");setModelo("");setColor("");setCantidad(0);
  };
  const btnSel=(activo,morado)=>({ padding:"5px 10px", borderRadius:6, border:"2px solid", borderColor:activo?(morado?C.morado:C.verde):C.border, background:activo?(morado?C.moradoClaro:C.verdeClaro):C.white, color:activo?(morado?C.morado:C.verdeOsc):C.textLight, cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"inherit" });
  return (
    <div className="card-anim" style={{ background:"rgba(255,255,255,0.93)", borderRadius:12, padding:16, boxShadow:"0 2px 14px rgba(0,0,0,0.08)", border:"2px solid "+C.border, backdropFilter:"blur(4px)", display:"flex", flexDirection:"column", gap:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <span style={{ fontSize:11, background:C.verdeClaro, color:C.verdeOsc, padding:"3px 8px", borderRadius:4, textTransform:"uppercase", letterSpacing:1, fontWeight:700 }}>Dientes</span>
        <span style={{ fontSize:11, background:C.moradoPale, color:C.morado, padding:"3px 8px", borderRadius:4, fontWeight:700 }}>Michydent</span>
      </div>
      <div><div style={{ fontWeight:700, fontSize:15 }}>Dientes de Acrílico</div><div style={{ fontSize:12, color:C.textLight }}>Selecciona tipo, modelo y color</div></div>
      <div><div style={{ fontSize:12, fontWeight:700, color:C.negroMedio, marginBottom:5 }}>Tipo:</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{Object.keys(DIENTES_CONFIG).map(t=><button key={t} onClick={()=>{setTipo(t);setModelo("");}} style={btnSel(tipo===t,false)}>{t}</button>)}</div>
      </div>
      {tipo && <div><div style={{ fontSize:12, fontWeight:700, color:C.negroMedio, marginBottom:5 }}>Modelo:</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{modelos.map(m=><button key={m} onClick={()=>setModelo(m)} style={btnSel(modelo===m,false)}>{m}</button>)}</div>
      </div>}
      <div><div style={{ fontSize:12, fontWeight:700, color:C.negroMedio, marginBottom:5 }}>Color:</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{DIENTES_COLORES.map(col=><button key={col} onClick={()=>setColor(col)} style={btnSel(color===col,true)}>{col}</button>)}</div>
      </div>
      {error && <div style={{ fontSize:12, color:"#e74c3c", fontWeight:600 }}>⚠ {error}</div>}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <div style={{ fontSize:21, fontWeight:800, color:C.verdeOsc }}>{fmt(producto.variantes[0].precio)}</div>
        <div style={{ display:"flex", alignItems:"center", gap:0, border:"2px solid "+C.border, borderRadius:10, overflow:"hidden" }}>
          <button onClick={()=>setCantidad(c=>Math.max(0,c-1))} style={{ width:36,height:36,border:"none",background:C.verdePale,cursor:"pointer",fontSize:18,fontWeight:800,color:"#111",display:"flex",alignItems:"center",justifyContent:"center" }}>−</button>
          <span style={{ minWidth:32,textAlign:"center",fontSize:15,fontWeight:800,color:"#111",padding:"0 4px" }}>{cantidad}</span>
          <button onClick={()=>setCantidad(c=>c+1)} style={{ width:36,height:36,border:"none",background:C.verdePale,cursor:"pointer",fontSize:18,fontWeight:800,color:"#111",display:"flex",alignItems:"center",justifyContent:"center" }}>+</button>
        </div>
      </div>
      <button onClick={handleAgregar} disabled={cantidad===0} className={cantidad>0?"btn-press":""} style={{ background:cantidad===0?"#ccc":C.verde,color:"white",border:"none",borderRadius:8,padding:"10px",cursor:cantidad===0?"not-allowed":"pointer",fontFamily:"inherit",fontSize:13,fontWeight:700,width:"100%" }}>
        {cantidad===0?"Selecciona cantidad":"🛒 Agregar al carrito"}
      </button>
      <div style={{ height:3, borderRadius:2, background:"linear-gradient(90deg,"+C.morado+"44,"+C.moradoMedio+"99)" }} />
    </div>
  );
};

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL (App)
// Controla toda la lógica de la aplicación:
// - Vista "catalogo": muestra los productos con filtros.
// - Vista "carrito": muestra los productos agregados y el formulario de entrega.
// Estados principales:
//   carrito: objeto con los productos seleccionados.
//   vista: "catalogo" o "carrito".
//   tipoEntrega: "retiro" o "envio".
//   pinOk: si el administrador ingresó el PIN correcto.
//   recargoPct: porcentaje de recargo por tarjeta de crédito.
// ─────────────────────────────────────────────
export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [ordenCampo, setOrdenCampo] = useState("");
  const [ordenDir, setOrdenDir] = useState("asc");
  const [carrito, setCarrito] = useState({});
  const [vista, setVista] = useState("catalogo");
  const [tipoEntrega, setTipoEntrega] = useState("retiro");
  const [datosEnvio, setDatosEnvio] = useState({ nombre:"", telefono:"", correo:"", direccion:"", comuna:"", nota:"" });
  const [errores, setErrores] = useState({});
  const [mostrarRecargo, setMostrarRecargo] = useState(false);
  const [recargoPct, setRecargoPct] = useState("");
  const [pinIngresado, setPinIngresado] = useState("");
  const [pinOk, setPinOk] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const [descuentoPct, setDescuentoPct] = useState("");
  const PIN = "1515";

  // normalizar: elimina tildes y mayúsculas para búsqueda flexible.
  // Ej: "espátula" y "espatula" encuentran lo mismo.
  const normalizar = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");

  // productosFiltrados: filtra y ordena los productos según
  // la categoría activa, el texto de búsqueda y el orden elegido.
  const productosFiltrados = useMemo(() => {
    const q = normalizar(busqueda);
    let lista = PRODUCTOS.filter(p => {
      const enCat = categoriaActiva==="Todas" || p.categoria===categoriaActiva;
      const enBusq = normalizar(p.nombre).includes(q) || normalizar(p.marca).includes(q) || normalizar(p.categoria).includes(q);
      return enCat && enBusq;
    });
    if(ordenCampo==="nombre") lista=[...lista].sort((a,b)=>ordenDir==="asc"?a.nombre.localeCompare(b.nombre):b.nombre.localeCompare(a.nombre));
    else if(ordenCampo==="precio"){
      lista=[...lista].sort((a,b)=>{
        const pa=a.esColor?a.colores[0].variantes[0].precio:a.variantes[0].precio;
        const pb=b.esColor?b.colores[0].variantes[0].precio:b.variantes[0].precio;
        return ordenDir==="asc"?pa-pb:pb-pa;
      });
    }
    return lista;
  },[categoriaActiva,busqueda,ordenCampo,ordenDir]);

  // toggleOrden: alterna entre ascendente → descendente → sin orden.
  const toggleOrden = campo => {
    if(ordenCampo===campo && ordenDir==="desc"){setOrdenCampo("");setOrdenDir("asc");}
    else if(ordenCampo===campo) setOrdenDir("desc");
    else{setOrdenCampo(campo);setOrdenDir("asc");}
  };

  // triggerCartBounce: activa la animación de rebote en el botón del carrito.
  const triggerCartBounce = () => { setCartAnim(true); setTimeout(()=>setCartAnim(false),500); };

  // agregarAlCarrito: agrega o suma cantidad a un producto en el carrito.
  // La clave única es id + formato para distinguir variantes del mismo producto.
  const agregarAlCarrito = (producto, variante, cant) => {
    const key = producto.id+"_"+variante.formato;
    setCarrito(prev=>({...prev,[key]:{id:key,nombre:producto.nombre,marca:producto.marca,formato:variante.formato,precio:variante.precio,cantidad:(prev[key]?.cantidad||0)+cant}}));
    triggerCartBounce();
  };
  // agregarDienteAlCarrito: versión especial para dientes.
  // El id ya viene compuesto con tipo|modelo|color.
  const agregarDienteAlCarrito = item => {
    setCarrito(prev=>({...prev,[item.id]:{...item,precio:item.variantes?item.variantes[0].precio:item.precio,cantidad:(prev[item.id]?.cantidad||0)+item.cantidad}}));
    triggerCartBounce();
  };
  // quitarDelCarrito: elimina completamente un producto del carrito.
  const quitarDelCarrito = id => setCarrito(prev=>{const n={...prev};delete n[id];return n;});
  // ajustarCarrito: suma o resta 1 unidad a un producto del carrito.
  // Si llega a 0, lo elimina automáticamente.
  const ajustarCarrito = (id,delta) => setCarrito(prev=>{
    const nueva=(prev[id]?.cantidad||0)+delta;
    if(nueva<=0){const n={...prev};delete n[id];return n;}
    return {...prev,[id]:{...prev[id],cantidad:nueva}};
  });

  // ── Cálculos del carrito ──
  // items: array de productos en el carrito.
  // subtotal: suma de precio × cantidad de cada item.
  // costoEnvio: $4.000 si es despacho, $0 si es retiro.
  // montoRecargo: porcentaje de recargo por tarjeta (solo si admin activó).
  // total: subtotal + envío + recargo.
  const items = Object.values(carrito);
  const subtotal = items.reduce((s,i)=>s+i.precio*i.cantidad,0);
  const costoEnvio = tipoEntrega==="envio"?COSTO_ENVIO:0;
  const montoRecargo = recargoPct&&pinOk?Math.round((subtotal+costoEnvio)*parseFloat(recargoPct)/100):0;
  // montoDescuento: descuento aplicado por el admin sobre el subtotal
  const montoDescuento = descuentoPct&&pinOk?Math.round(subtotal*parseFloat(descuentoPct)/100):0;
  const total = subtotal+costoEnvio+montoRecargo-montoDescuento;
  const cantTotal = items.reduce((s,i)=>s+i.cantidad,0);

  // validar: revisa que los campos de envío estén completos.
  // Solo corre si el tipo de entrega es "envio".
  // Retorna true si todo está bien, false si hay errores.
  const validar = () => {
    if(tipoEntrega!=="envio") return true;
    const e={};
    if(!datosEnvio.nombre.trim()) e.nombre="Requerido";
    if(!datosEnvio.telefono.trim()) e.telefono="Requerido";
    else if(!/^\d+$/.test(datosEnvio.telefono)) e.telefono="Solo números";
    if(datosEnvio.correo&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosEnvio.correo)) e.correo="Correo inválido";
    if(!datosEnvio.direccion.trim()) e.direccion="Requerido";
    if(!datosEnvio.comuna.trim()) e.comuna="Requerido";
    setErrores(e);
    return Object.keys(e).length===0;
  };

  // generarWhatsApp: construye el mensaje de WhatsApp con todos los datos
  // del pedido (productos, totales, entrega) y abre el chat directo.
  const generarWhatsApp = () => {
    if(items.length===0||!validar()) return;
    const lineas=items.map(i=>"• "+i.nombre+(i.marca&&i.marca!=="-"?" ("+i.marca+")":"")+" "+i.formato+" x"+i.cantidad+" = "+fmt(i.precio*i.cantidad)).join("\n");
    const entregaInfo=tipoEntrega==="retiro"?"📍 *Retiro en local* (gratis)":"🚚 *Envío a domicilio* (+"+fmt(COSTO_ENVIO)+")\n   Nombre: "+datosEnvio.nombre+"\n   Teléfono: "+datosEnvio.telefono+(datosEnvio.correo?"\n   Correo: "+datosEnvio.correo:"")+"\n   Dirección: "+datosEnvio.direccion+", "+datosEnvio.comuna+(datosEnvio.nota?"\n   Nota: "+datosEnvio.nota:"");
    const msg="Hola GEA-DENTAL! Quiero hacer el siguiente pedido:\n\n"+lineas+"\n\nSubtotal: "+fmt(subtotal)+"\nEnvío: "+(tipoEntrega==="envio"?fmt(COSTO_ENVIO):"Gratis")+(montoRecargo>0?"\nRecargo tarjeta ("+recargoPct+"%): +"+fmt(montoRecargo):"")+"\n*TOTAL: "+fmt(total)+"*\n\n"+entregaInfo+"\n\n¿Confirman disponibilidad y datos de pago? 🙏";
    window.open("https://wa.me/56927188959?text="+encodeURIComponent(msg),"_blank");
  };

  // descargarPDF: genera un archivo HTML con formato de cotización
  // que al abrirse activa el diálogo de impresión/guardar PDF.
  // Solo visible para el administrador (requiere PIN).
  const descargarPDF = () => {
    const fecha=new Date().toLocaleDateString("es-CL",{day:"2-digit",month:"long",year:"numeric"});
    const nro="COT-"+Date.now().toString().slice(-6);
    const filas=items.map((i,idx)=>`<tr><td style="padding:9px 10px;border-bottom:1px solid #c8e6cc;background:${idx%2===0?"#f2fbf3":"#fff"}">${i.nombre}${i.marca&&i.marca!=="-"?" ("+i.marca+")":""}<br><small style="color:#888">${i.formato||""}</small></td><td style="padding:9px 10px;text-align:center;border-bottom:1px solid #c8e6cc;background:${idx%2===0?"#f2fbf3":"#fff"}">${i.cantidad}</td><td style="padding:9px 10px;text-align:right;border-bottom:1px solid #c8e6cc;background:${idx%2===0?"#f2fbf3":"#fff"};color:#555">${fmt(i.precio)}</td><td style="padding:9px 10px;text-align:right;border-bottom:1px solid #c8e6cc;background:${idx%2===0?"#f2fbf3":"#fff"};font-weight:800;color:#2d7a34">${fmt(i.precio*i.cantidad)}</td></tr>`).join("");
    const entregaTxt=tipoEntrega==="retiro"?"<b>Retiro en local</b> — Gratis":`<b>Envio a domicilio</b> — ${fmt(COSTO_ENVIO)}<br>Nombre: ${datosEnvio.nombre}<br>Tel: ${datosEnvio.telefono}<br>Dir: ${datosEnvio.direccion}, ${datosEnvio.comuna}${datosEnvio.nota?"<br>Nota: "+datosEnvio.nota:""}`;
    const descuentoHtml=montoDescuento>0?`<div style="display:flex;justify-content:space-between;padding:5px 0;color:#27ae60;font-weight:600"><span>🎁 Descuento (${descuentoPct}%)</span><span>− ${fmt(montoDescuento)}</span></div>`:""; const recargoHtml=montoRecargo>0?`<div style="display:flex;justify-content:space-between;padding:5px 0;color:#e67e22;font-weight:600;gap:12px"><span>💳 Recargo tarjeta (${recargoPct}%)<br><small style="color:#aaa;font-size:10px">Comisión por pago con tarjeta de crédito</small></span><span>+${fmt(montoRecargo)}</span></div>`:"";
    const notaRecargo=montoRecargo>0?`<div style="background:#fff8e6;border:1px solid #f0c040;border-radius:6px;padding:8px 12px;font-size:11px;color:#7d5a00;margin-top:10px">ℹ️ Se aplica un recargo del ${recargoPct}% por pago con tarjeta de crédito. Este monto corresponde a la comisión bancaria trasladada al cliente.</div>`:"";
    const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Cotizacion ${nro}</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;padding:24px;color:#1a1a1a;font-size:13px}.top{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:14px;border-bottom:3px solid #4aad52;margin-bottom:18px}.brand{font-size:24px;font-weight:900}.brand span{color:#4aad52}table{width:100%;border-collapse:collapse;margin-bottom:18px}thead tr{background:#1a1a1a}thead th{padding:9px 10px;color:#fff;font-size:11px;text-transform:uppercase;text-align:left}.totbox{display:flex;justify-content:flex-end;margin-bottom:18px}.tot{border:2px solid #4aad52;border-radius:8px;padding:14px 18px;min-width:250px}.tot-row{display:flex;justify-content:space-between;padding:5px 0;color:#555;font-size:13px}.tot-final{display:flex;justify-content:space-between;border-top:2px solid #4aad52;margin-top:8px;padding-top:8px;font-size:17px;font-weight:900;color:#2d7a34}.entrega{background:#f2fbf3;border:1.5px solid #c8e6cc;border-radius:8px;padding:14px 16px;margin-bottom:18px;font-size:12px;line-height:1.8}.footer{text-align:center;font-size:10px;color:#aaa;border-top:1px solid #eee;padding-top:12px;margin-top:8px}@media print{body{padding:12px}}</style></head><body><div class="top"><div><div class="brand">GEA-<span>DENTAL</span></div><div style="font-size:10px;color:#888;letter-spacing:2px;margin-top:3px">INSUMOS DENTALES</div><div style="font-size:11px;color:#888;margin-top:6px">+56 9 2718 8959</div></div><div style="text-align:right"><div style="font-size:11px;color:#888">COTIZACION</div><div style="font-size:20px;font-weight:900;color:#2d7a34">${nro}</div><div style="font-size:11px;color:#888">${fecha}</div></div></div><table><thead><tr><th>Producto</th><th style="text-align:center">Cant.</th><th style="text-align:right">P.Unit.</th><th style="text-align:right">Subtotal</th></tr></thead><tbody>${filas}</tbody></table><div class="totbox"><div class="tot"><div class="tot-row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div><div class="tot-row"><span>Envío</span><span>${tipoEntrega==="envio"?fmt(COSTO_ENVIO):"Gratis"}</span></div>${descuentoHtml}${recargoHtml}<div class="tot-final"><span>TOTAL</span><span>${fmt(total)}</span></div>${notaRecargo}</div></div><div class="entrega"><strong style="font-size:11px;color:#2d7a34;text-transform:uppercase;letter-spacing:1px">Entrega</strong><br><br>${entregaTxt}</div><div class="footer">GEA-DENTAL · Insumos Dentales · +56 9 2718 8959 · Documento válido como cotización.</div><script>window.onload=()=>{window.print()}<\/script></body></html>`;
    const blob=new Blob([html],{type:"text/html;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download="cotizacion-"+nro+".html";
    document.body.appendChild(a);a.click();document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url),5000);
  };

  // renderCampo: genera un campo de formulario reutilizable con label,
  // validación visual y soporte para props extra (ej: inputMode numérico).
  const renderCampo = (label,key,placeholder,tipo,requerido,extraProps={}) => (
    <div style={{ display:"flex",flexDirection:"column",gap:4 }}>
      <label style={{ fontSize:13,fontWeight:700,color:C.negroMedio }}>{label} {requerido&&<span style={{color:"#e74c3c"}}>*</span>}</label>
      <input type={tipo} placeholder={placeholder} defaultValue={datosEnvio[key]}
        onBlur={e=>{setDatosEnvio(prev=>({...prev,[key]:e.target.value}));setErrores(prev=>({...prev,[key]:null}));}}
        style={{...inputBase,borderColor:errores[key]?"#e74c3c":C.border}} {...extraProps} />
      {errores[key]&&<span style={{fontSize:12,color:"#e74c3c"}}>⚠ {errores[key]}</span>}
    </div>
  );

  return (
    <div style={{ fontFamily:"'Segoe UI',sans-serif", minHeight:"100vh", background:C.bg, color:C.text, position:"relative" }}>
      <GlobalStyles />
      <WatermarkBg />
      <div style={{ position:"relative", zIndex:1 }}>

        {/* HEADER */}
        <header className="futuristic-header" style={{ color:"white", position:"sticky", top:0, zIndex:100 }}>
          <div className="header-grid-bg" />
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8, position:"relative" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <LogoImg style={{ width:90, height:90, borderRadius:"50%", background:"white", padding:4, boxShadow:"0 0 20px rgba(74,173,82,0.7), 0 0 40px rgba(74,173,82,0.3)" }} />
              <div>
                <div style={{ fontSize:11, opacity:0.7, letterSpacing:3, textTransform:"uppercase", color:"#4aad52", marginBottom:2 }}>🦷 Catálogo & Cotizador</div>
                <div style={{ display:"flex", alignItems:"baseline", gap:0, fontFamily:"monospace" }}>
                  {"GEA-".split("").map((l,i)=><span key={i} className="brand-letter neon" style={{fontSize:21,fontWeight:900,color:"white",letterSpacing:1}}>{l}</span>)}
                  {"DENTAL".split("").map((l,i)=><span key={i} className="brand-letter neon" style={{fontSize:21,fontWeight:900,color:"#4aad52",letterSpacing:1}}>{l}</span>)}
                </div>
              </div>
            </div>
            <button onClick={()=>setVista(v=>v==="carrito"?"catalogo":"carrito")} className={cartAnim?"cart-bounce":""} style={{ background:cantTotal>0?C.verde:"rgba(255,255,255,0.12)", color:"white", border:"2px solid "+(cantTotal>0?C.verdeOsc:"rgba(255,255,255,0.3)"), borderRadius:30, padding:"10px 20px", cursor:"pointer", fontFamily:"inherit", fontSize:14, fontWeight:700, display:"flex", alignItems:"center", gap:8 }}>
              🛒 {cantTotal>0?cantTotal+" items · "+fmt(total):"Cotización vacía"}
            </button>
          </div>
        </header>

        <main style={{ maxWidth:1100, margin:"0 auto", padding:"24px 16px" }}>

          {vista==="carrito" ? (
            <div>
              <div className="slide-down" style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
                <button onClick={()=>setVista("catalogo")} style={{ background:"none", border:"2px solid "+C.verde, borderRadius:8, padding:"8px 16px", cursor:"pointer", fontFamily:"inherit", fontSize:14, color:C.verde, fontWeight:700 }}>← Volver</button>
                <h2 style={{ margin:0, fontSize:22, color:C.negroMedio }}>Tu Cotización</h2>
              </div>

              {items.length===0 ? (
                <div style={{ textAlign:"center", padding:80, color:C.textLight }}>
                  <div style={{ fontSize:52 }}>🛒</div><p>No hay productos aún.</p>
                </div>
              ) : (<>
                <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
                  {items.map(item=>(
                    <div key={item.id} style={{ background:C.white, borderRadius:12, padding:"14px 16px", boxShadow:"0 2px 10px rgba(0,0,0,0.07)", border:"1px solid "+C.border }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                        <div>
                          <div style={{ fontWeight:700, fontSize:14 }}>{item.nombre}</div>
                          <div style={{ fontSize:12, color:C.textLight }}>{item.marca&&item.marca!=="-"?item.marca+" · ":""}{item.formato}</div>
                          <div style={{ fontSize:12, color:C.textLight, marginTop:2 }}>Precio unit: <strong style={{color:C.verdeOsc}}>{fmt(item.precio)}</strong></div>
                        </div>
                        <button onClick={()=>quitarDelCarrito(item.id)} style={{ background:"#fff0f0",border:"none",cursor:"pointer",color:"#e74c3c",fontSize:18,fontWeight:700,borderRadius:6,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>×</button>
                      </div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div style={{ display:"flex", alignItems:"center", border:"2px solid "+C.border, borderRadius:10, overflow:"hidden" }}>
                          <button onClick={()=>ajustarCarrito(item.id,-1)} style={{ width:36,height:36,border:"none",background:C.verdePale,cursor:"pointer",fontSize:18,fontWeight:800,color:"#111",display:"flex",alignItems:"center",justifyContent:"center" }}>−</button>
                          <span style={{ minWidth:36,textAlign:"center",fontSize:15,fontWeight:800,color:"#111",padding:"0 6px" }}>{item.cantidad}</span>
                          <button onClick={()=>ajustarCarrito(item.id,1)} style={{ width:36,height:36,border:"none",background:C.verdePale,cursor:"pointer",fontSize:18,fontWeight:800,color:"#111",display:"flex",alignItems:"center",justifyContent:"center" }}>+</button>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:11, color:C.textLight }}>Total</div>
                          <div style={{ fontSize:18, fontWeight:800, color:C.verdeOsc }}>{fmt(item.precio*item.cantidad)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ background:C.verdeClaro, borderRadius:10, padding:"12px 16px", display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontSize:14, color:C.textLight }}>Subtotal ({cantTotal} items)</span>
                    <span style={{ fontSize:16, fontWeight:800, color:C.verdeOsc }}>{fmt(subtotal)}</span>
                  </div>
                </div>

                {/* Entrega */}
                <div style={{ background:C.white, borderRadius:14, padding:20, marginBottom:20, boxShadow:"0 2px 14px rgba(0,0,0,0.08)", border:"1px solid "+C.border }}>
                  <h3 style={{ margin:"0 0 14px", fontSize:16, color:C.negroMedio, borderBottom:"2px solid "+C.border, paddingBottom:10 }}>📦 Tipo de entrega</h3>
                  <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap" }}>
                    <button onClick={()=>setTipoEntrega("retiro")} style={{ flex:1,minWidth:140,padding:"14px 16px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",fontSize:14,fontWeight:700,textAlign:"left",border:"2px solid "+(tipoEntrega==="retiro"?C.verde:C.border),background:tipoEntrega==="retiro"?C.verdeClaro:C.white,color:tipoEntrega==="retiro"?C.verdeOsc:C.textLight }}>
                      <div style={{fontSize:22,marginBottom:4}}>🏪</div><div>Retiro en local</div>
                      <div style={{fontSize:13,fontWeight:800,color:tipoEntrega==="retiro"?C.verde:"#aaa",marginTop:4}}>Gratis</div>
                    </button>
                    <button onClick={()=>setTipoEntrega("envio")} style={{ flex:1,minWidth:140,padding:"14px 16px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",fontSize:14,fontWeight:700,textAlign:"left",border:"2px solid "+(tipoEntrega==="envio"?C.morado:C.borderMorado),background:tipoEntrega==="envio"?C.moradoClaro:C.white,color:tipoEntrega==="envio"?C.morado:C.textLight }}>
                      <div style={{fontSize:22,marginBottom:4}}>🚚</div><div>Envío a domicilio</div>
                      <div style={{fontSize:13,fontWeight:800,color:tipoEntrega==="envio"?C.moradoMedio:"#aaa",marginTop:4}}>+{fmt(COSTO_ENVIO)}</div>
                    </button>
                  </div>
                  {tipoEntrega==="envio" && (
                    <div style={{ background:C.moradoPale, borderRadius:10, padding:18, border:"1.5px solid "+C.borderMorado, display:"flex", flexDirection:"column", gap:14 }}>
                      <div style={{ fontSize:13, fontWeight:700, color:C.morado }}>📋 Datos para el envío</div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                        {renderCampo("Nombre completo","nombre","Ej: Juan Pérez","text",true)}
                        {renderCampo("Teléfono","telefono","912345678","tel",true,{inputMode:"numeric",onInput:e=>{e.target.value=e.target.value.replace(/\D/g,"");}})}
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                        {renderCampo("Correo","correo","juan@correo.com","email",false)}
                        {renderCampo("Comuna","comuna","Ej: Santiago","text",true)}
                      </div>
                      {renderCampo("Dirección","direccion","Calle y número","text",true)}
                      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                        <label style={{ fontSize:13, fontWeight:700, color:C.negroMedio }}>Nota <span style={{fontWeight:400,color:C.textLight}}>(opcional)</span></label>
                        <textarea placeholder="Ej: Dejar con el conserje..." defaultValue={datosEnvio.nota} onBlur={e=>setDatosEnvio(prev=>({...prev,nota:e.target.value}))} rows={2} style={{...inputBase,resize:"vertical",lineHeight:1.5}} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Resumen */}
                <div style={{ background:C.white, borderRadius:12, padding:"16px 20px", marginBottom:16, boxShadow:"0 2px 10px rgba(0,0,0,0.07)", border:"1px solid "+C.border }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, fontSize:14, color:C.textLight }}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, fontSize:14, color:tipoEntrega==="envio"?C.morado:C.verde }}><span>{tipoEntrega==="envio"?"🚚 Envío":"🏪 Retiro"}</span><span style={{fontWeight:700}}>{tipoEntrega==="envio"?fmt(COSTO_ENVIO):"Gratis"}</span></div>
                  {pinOk&&montoDescuento>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:14,color:"#27ae60"}}><span>🎁 Descuento ({descuentoPct}%)</span><span style={{fontWeight:700}}>−{fmt(montoDescuento)}</span></div>}
                  {pinOk&&montoRecargo>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:14,color:"#e67e22"}}><span>💳 Recargo tarjeta ({recargoPct}%)</span><span style={{fontWeight:700}}>+{fmt(montoRecargo)}</span></div>}

                  {/* Panel Admin */}
                  <div style={{marginBottom:10}}>
                    {!mostrarRecargo?(
                      <button onClick={()=>setMostrarRecargo(true)} style={{background:"none",border:"1px dashed "+C.border,borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,color:C.textLight,fontFamily:"inherit",width:"100%"}}>🔒 Administrador</button>
                    ):!pinOk?(
                      <div style={{background:"#fff8e6",border:"1.5px solid #f0c040",borderRadius:10,padding:12,display:"flex",gap:8,alignItems:"center"}}>
                        <input type="password" placeholder="PIN" value={pinIngresado} onChange={e=>setPinIngresado(e.target.value)}
                          onKeyDown={e=>{if(e.key==="Enter"){if(pinIngresado===PIN)setPinOk(true);else{setPinIngresado("");alert("PIN incorrecto");}}}}
                          style={{width:80,padding:"7px 10px",borderRadius:7,border:"1.5px solid #f0c040",fontSize:14,textAlign:"center",fontFamily:"inherit",outline:"none"}} maxLength={6}/>
                        <button onClick={()=>{if(pinIngresado===PIN)setPinOk(true);else{setPinIngresado("");alert("PIN incorrecto");}}} style={{background:"#e67e22",color:"white",border:"none",borderRadius:7,padding:"7px 14px",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:700}}>Ingresar</button>
                        <button onClick={()=>{setMostrarRecargo(false);setPinIngresado("");}} style={{background:"none",border:"none",cursor:"pointer",color:C.textLight,fontSize:18}}>×</button>
                      </div>
                    ):(
                      <div style={{background:"#fff8e6",border:"1.5px solid #f0c040",borderRadius:12,padding:14,display:"flex",flexDirection:"column",gap:12}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <span style={{fontSize:13,fontWeight:800,color:"#7d5a00"}}>🔒 Panel Administrador</span>
                          <button onClick={()=>{setPinOk(false);setMostrarRecargo(false);setRecargoPct("");setDescuentoPct("");setPinIngresado("");}} style={{background:"none",border:"none",cursor:"pointer",color:C.textLight,fontSize:20}}>×</button>
                        </div>
                        {/* Campo descuento */}
                        <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                          <span style={{fontSize:13,color:"#27ae60",fontWeight:600}}>🎁 Descuento:</span>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <input type="number" min="0" max="100" step="0.5" value={descuentoPct} onChange={e=>setDescuentoPct(e.target.value)} placeholder="0"
                              style={{width:60,padding:"6px 8px",borderRadius:7,border:"1.5px solid #27ae60",fontSize:14,textAlign:"center",fontFamily:"inherit",outline:"none",color:"#111",background:"white"}}/>
                            <span style={{fontSize:14,fontWeight:700,color:"#27ae60"}}>%</span>
                          </div>
                          {descuentoPct&&parseFloat(descuentoPct)>0&&<span style={{fontSize:13,color:"#27ae60",fontWeight:700}}>− {fmt(montoDescuento)}</span>}
                        </div>

                        {/* Campo recargo tarjeta */}
                        <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                          <span style={{fontSize:13,color:"#7d5a00",fontWeight:600}}>💳 Recargo tarjeta:</span>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <input type="number" min="0" max="30" step="0.5" value={recargoPct} onChange={e=>setRecargoPct(e.target.value)} placeholder="0"
                              style={{width:60,padding:"6px 8px",borderRadius:7,border:"1.5px solid #f0c040",fontSize:14,textAlign:"center",fontFamily:"inherit",outline:"none",color:"#111",background:"white"}}/>
                            <span style={{fontSize:14,fontWeight:700,color:"#7d5a00"}}>%</span>
                          </div>
                        </div>
                        {recargoPct&&parseFloat(recargoPct)>0&&(
                          <div style={{background:"white",borderRadius:8,padding:12,border:"1px solid #f0c040",fontSize:13}}>
                            <div style={{fontWeight:700,color:"#7d5a00",marginBottom:8,fontSize:12,textTransform:"uppercase",letterSpacing:1}}>📊 Desglose de cobro</div>
                            <div style={{display:"flex",justifyContent:"space-between",color:"#555",marginBottom:5}}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                            {montoDescuento>0&&<div style={{display:"flex",justifyContent:"space-between",color:"#27ae60",marginBottom:5}}><span>🎁 Descuento ({descuentoPct}%)</span><span style={{fontWeight:700}}>− {fmt(montoDescuento)}</span></div>}
                            {costoEnvio>0&&<div style={{display:"flex",justifyContent:"space-between",color:"#555",marginBottom:5}}><span>Envío</span><span>{fmt(costoEnvio)}</span></div>}
                            {montoRecargo>0&&<div style={{display:"flex",justifyContent:"space-between",color:"#e67e22",marginBottom:5,borderTop:"1px dashed #f0c040",paddingTop:6}}><span>Recargo tarjeta ({recargoPct}%)</span><span style={{fontWeight:700}}>+{fmt(montoRecargo)}</span></div>}
                            <div style={{display:"flex",justifyContent:"space-between",color:"#2d7a34",fontWeight:800,fontSize:15,borderTop:"2px solid #f0c040",paddingTop:8}}><span>Total final</span><span>{fmt(total)}</span></div>
                            <div style={{marginTop:8,padding:"6px 10px",background:"#fff3cd",borderRadius:6,fontSize:11,color:"#7d5a00"}}>ℹ️ Recargo del {recargoPct}% por comisión bancaria de tarjeta de crédito.</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{display:"flex",justifyContent:"space-between",borderTop:"2px solid "+C.border,paddingTop:12,fontSize:20,fontWeight:800,color:C.verdeOsc}}><span>TOTAL</span><span>{fmt(total)}</span></div>
                </div>

                {/* Botones */}
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  <div className="ws-btn-outer">
                    <div className="ws-scan" />
                    <button onClick={generarWhatsApp} className="btn-press ws-btn-inner" style={{width:"100%",padding:18,position:"relative",background:"linear-gradient(90deg,#128c3a,#25D366,#1da851)",color:"white",border:"none",borderRadius:12,fontSize:17,fontWeight:800,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                      💬 Enviar cotización por WhatsApp
                    </button>
                  </div>
                  {pinOk&&(
                    <button onClick={descargarPDF} className="btn-press" style={{width:"100%",padding:14,background:"linear-gradient(90deg,"+C.morado+","+C.moradoMedio+")",color:"white",border:"none",borderRadius:12,fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                      📄 Descargar cotización PDF
                    </button>
                  )}
                </div>
              </>)}
            </div>
          ) : (
            <>
              <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="🔍 Buscar producto o marca..."
                style={{width:"100%",padding:"13px 18px",borderRadius:10,border:"2px solid "+C.border,fontSize:15,fontFamily:"inherit",background:C.white,outline:"none",boxSizing:"border-box",marginBottom:16,color:C.text}}/>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
                {CATEGORIAS.map(cat=>(
                  <button key={cat} onClick={()=>setCategoriaActiva(cat)} style={{padding:"7px 15px",borderRadius:20,border:"2px solid "+(categoriaActiva===cat?C.verdeOsc:C.border),background:categoriaActiva===cat?C.verdeOsc:"rgba(255,255,255,0.85)",color:categoriaActiva===cat?"white":C.textLight,cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600}}>{cat}</button>
                ))}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20,flexWrap:"wrap"}}>
                <label style={{fontSize:13,color:C.textLight,fontWeight:600}}>Ordenar por:</label>
                <select value={ordenCampo+"_"+ordenDir} onChange={e=>{const v=e.target.value;if(v==="_asc"){setOrdenCampo("");setOrdenDir("asc");}else{const[c,d]=v.split("_");setOrdenCampo(c);setOrdenDir(d);}}} style={{padding:"9px 14px",borderRadius:10,border:"2px solid "+C.border,fontSize:14,fontFamily:"inherit",color:C.text,background:C.white,cursor:"pointer",outline:"none",fontWeight:600,minWidth:200}}>
                  <option value="_asc">Relevancia (por defecto)</option>
                  <option value="nombre_asc">Nombre: A → Z</option>
                  <option value="nombre_desc">Nombre: Z → A</option>
                  <option value="precio_asc">Precio: menor a mayor</option>
                  <option value="precio_desc">Precio: mayor a menor</option>
                </select>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(265px,100%),1fr))",gap:14}}>
                {productosFiltrados.map(producto=>{
                  if(producto.esDiente) return <DienteCard key={producto.id} producto={producto} onAgregar={agregarDienteAlCarrito} C={C} fmt={fmt}/>;
                  if(producto.esColor) return <ColorVarianteCard key={producto.id} producto={producto} carrito={carrito} onAgregar={agregarAlCarrito} C={C} fmt={fmt}/>;
                  return <VarianteCard key={producto.id} producto={producto} carrito={carrito} onAgregar={agregarAlCarrito} C={C} fmt={fmt}/>;
                })}
              </div>
              {productosFiltrados.length===0&&<div style={{textAlign:"center",padding:80,color:C.textLight}}><div style={{fontSize:48}}>🔍</div><p>No se encontraron productos.</p></div>}
            </>
          )}
        </main>

        <footer style={{textAlign:"center",padding:"20px",borderTop:"1px solid "+C.border,marginTop:20}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <LogoImg style={{width:28,height:28}}/>
            <span style={{fontSize:13,color:C.textLight}}>
              <span style={{fontWeight:700,color:C.negroMedio}}>GEA-</span>
              <span style={{fontWeight:700,color:C.verde}}>DENTAL</span>
              {" · "}Insumos de calidad para profesionales y estudiantes
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
