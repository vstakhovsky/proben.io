/* global React, useState, useEffect */
/* Proben — "Stacky" mascot. Optional, state-driven status signal.
   States: idle | scanning | gap | practicing | ready | celebrate */

const MascotCtx = React.createContext({ enabled: true, toggle: () => {}, setEnabled: () => {} });
const useMascot = () => React.useContext(MascotCtx);

function MascotProvider({ children }) {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    try { const v = localStorage.getItem('proben:mascot'); if (v !== null) setEnabled(v === '1'); } catch (e) {}
  }, []);
  const apply = (v) => { setEnabled(v); try { localStorage.setItem('proben:mascot', v ? '1' : '0'); } catch (e) {} };
  const toggle = () => apply(!enabled);
  return <MascotCtx.Provider value={{ enabled, toggle, setEnabled: apply }}>{children}</MascotCtx.Provider>;
}

/* ---- per-state pixel blocks ---- */
function MascotShapes({ state }) {
  const G = {
    grayTop: 'var(--mascot-gray-top)', grayMid: 'var(--mascot-gray-mid)', grayDark: 'var(--mascot-gray-dark)', grayLine: 'var(--mascot-gray-line)',
    gTop: 'var(--mascot-green-top)', gMid: 'var(--mascot-green-mid)', gDark: 'var(--mascot-green-dark)',
    coral: 'var(--mascot-coral)', blue: 'var(--mascot-blue)', spark: 'var(--mascot-spark)',
    eye: 'var(--mascot-eye-dark)', eyeL: 'var(--mascot-eye-light)',
  };
  const feet = <><rect x="38" y="74" width="8" height="6" fill={G.grayDark} /><rect x="54" y="74" width="8" height="6" fill={G.grayDark} /></>;

  if (state === 'scanning') return (
    <>
      <rect x="44" y="20" width="11" height="3" fill={G.blue} className="mascot-scan-wave" />
      <rect x="28" y="64" width="44" height="10" fill={G.grayTop} />
      <rect x="32" y="52" width="36" height="12" fill={G.grayMid} />
      <rect x="36" y="38" width="28" height="14" fill={G.grayDark} />
      <rect x="44" y="44" width="4" height="4" fill={G.eye} />
      <rect x="54" y="44" width="4" height="4" fill={G.eye} />
      <rect x="46" y="54" width="8" height="3" fill={G.grayLine} />
      <rect x="48" y="30" width="3" height="8" fill={G.grayLine} />
      <rect x="45" y="26" width="9" height="5" fill={G.blue} />
      {feet}
    </>
  );
  if (state === 'gap') return (
    <>
      <rect x="28" y="64" width="44" height="10" fill={G.grayTop} />
      <rect x="32" y="52" width="36" height="12" fill={G.coral} />
      <rect x="36" y="38" width="28" height="14" fill={G.grayDark} />
      <rect x="44" y="43" width="4" height="5" fill={G.eye} />
      <rect x="54" y="43" width="4" height="5" fill={G.eye} />
      <rect x="47" y="53" width="6" height="5" fill={G.eye} />
      <rect x="48" y="30" width="3" height="8" fill={G.grayLine} />
      <rect x="45" y="26" width="9" height="5" fill={G.coral} />
      <g className="mascot-excl"><rect x="68" y="32" width="4" height="4" fill={G.coral} /><rect x="68" y="40" width="4" height="4" fill={G.coral} /></g>
      {feet}
    </>
  );
  if (state === 'practicing') return (
    <>
      <rect x="28" y="64" width="44" height="10" fill={G.grayTop} />
      <rect x="32" y="52" width="36" height="12" fill={G.gTop} />
      <rect x="36" y="38" width="28" height="14" fill={G.gMid} />
      <rect x="44" y="44" width="4" height="4" fill={G.eye} />
      <rect x="54" y="44" width="4" height="4" fill={G.eye} />
      <rect x="46" y="54" width="8" height="3" fill={G.eye} />
      <rect x="48" y="30" width="3" height="8" fill={G.grayLine} />
      <rect x="45" y="26" width="9" height="5" fill={G.gMid} />
      <rect x="24" y="42" width="6" height="6" fill={G.grayLine} />
      {feet}
    </>
  );
  if (state === 'ready' || state === 'celebrate') return (
    <>
      {state === 'celebrate' && <>
        <rect x="22" y="30" width="4" height="4" fill={G.spark} className="mascot-spark" />
        <rect x="16" y="36" width="4" height="4" fill={G.spark} className="mascot-spark" />
        <rect x="74" y="30" width="4" height="4" fill={G.spark} className="mascot-spark" />
        <rect x="80" y="36" width="4" height="4" fill={G.spark} className="mascot-spark" />
      </>}
      <rect x="28" y="64" width="44" height="10" fill={G.gTop} />
      <rect x="32" y="52" width="36" height="12" fill={G.gMid} />
      <rect x="36" y="38" width="28" height="14" fill={G.gDark} />
      <rect x="44" y="44" width="4" height="4" fill={G.eyeL} />
      <rect x="54" y="44" width="4" height="4" fill={G.eyeL} />
      <rect x="45" y="53" width="10" height="3" fill={G.eyeL} />
      <rect x="48" y="30" width="3" height="8" fill={G.gMid} />
      <rect x="45" y="26" width="9" height="5" fill={G.gMid} />
      <rect x="66" y="28" width="4" height="4" fill={G.gMid} />
      <rect x="70" y="32" width="4" height="4" fill={G.gMid} />
      <rect x="66" y="36" width="8" height="4" fill={G.gMid} />
      {feet}
    </>
  );
  /* idle (default) */
  return (
    <>
      <rect x="28" y="64" width="44" height="10" fill={G.grayTop} />
      <rect x="32" y="52" width="36" height="12" fill={G.grayMid} />
      <rect x="36" y="38" width="28" height="14" fill={G.grayDark} />
      <rect x="44" y="44" width="4" height="4" fill={G.eye} />
      <rect x="54" y="44" width="4" height="4" fill={G.eye} />
      <rect x="46" y="54" width="8" height="3" fill={G.grayLine} />
      <rect x="48" y="30" width="3" height="8" fill={G.grayLine} />
      <rect x="45" y="26" width="9" height="5" fill={G.grayDark} />
      {feet}
    </>
  );
}

function Mascot({ state = 'idle', size = 40, animated = false, className = '', dismissible = false }) {
  const { enabled, toggle } = useMascot();
  const [hover, setHover] = useState(false);
  if (!enabled) return null;
  const animClass = animated ? ('mascot-anim is-' + state) : '';
  return (
    <span className={className} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', display: 'inline-flex', width: size, height: size * 1.04, lineHeight: 0 }}>
      <svg className={animClass} viewBox="0 0 100 104" width={size} height={size * 1.04} shapeRendering="crispEdges" aria-hidden="true" style={{ display: 'block' }}>
        <MascotShapes state={state} />
      </svg>
      {dismissible && hover && (
        <button onClick={toggle} aria-label="Hide mascot" title="Hide mascot"
          style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%', border: '1px solid var(--line-strong)', background: 'var(--panel)', color: 'var(--muted)', cursor: 'pointer', display: 'grid', placeItems: 'center', fontSize: 11, padding: 0, lineHeight: 1, boxShadow: 'var(--shadow-pop)' }}>×</button>
      )}
    </span>
  );
}

Object.assign(window, { MascotProvider, useMascot, Mascot });
