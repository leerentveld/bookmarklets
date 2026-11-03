javascript: (function() {
    "use strict";
    const TARGET = "https://zwiftbikes.com/garage";
    if (window.location.href.split(/[?#]/)[0].replace(/\/+$/, "") !== TARGET.replace(/\/+$/, "")) {
        return window.location.assign(TARGET);
    }
    const prev = document.getElementById("zbg-host");
    if (prev) return prev.remove();
    const KEYS = ["zwift-bikes:rider-profile", "zwift-bikes:preferences", "zwift-bikes:garage", "zwift-bikes:garage-wheels"];
    const getSafe = k => {
        try {
            return JSON.parse(localStorage.getItem(k) || "null")
        } catch (e) {
            return null
        }
    };
    const pad = n => String(n).padStart(2, "0");
    const fmtTs = d => {
        const dt = new Date(d);
        if (isNaN(dt)) return "—";
        return `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())} ${pad(dt.getHours())}:${pad(dt.getMinutes())}`
    };
    const fileStamp = () => {
        const n = new Date();
        return `${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate())}_${pad(n.getHours())}${pad(n.getMinutes())}`
    };
    const host = document.createElement("div");
    host.id = "zbg-host";
    Object.assign(host.style, {
        position: "fixed",
        inset: "0",
        zIndex: "2147483647",
        pointerEvents: "none"
    });
    const shadow = host.attachShadow({
        mode: "open"
    });
    const css = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}:host{--bg:#fff;--fg:#1f2328;--sub:#656d76;--border:#d0d7de;--card:#f6f8fa;--card-b:#e1e4e8;--accent:#ff6600;--accent-sub:#ffefe5;--kbd:rgba(0,0,0,0.06);--succ:#1a7f37;--err:#cf222e;--diff-bg:#fff8f2;--diff-b:#ffe0b2}@media(prefers-color-scheme:dark){:host{--bg:#161b22;--fg:#f0f6fc;--sub:#8b949e;--border:#30363d;--card:#0d1117;--card-b:#21262d;--accent:#ff771a;--accent-sub:#3d1e0a;--kbd:rgba(255,255,255,0.1);--succ:#3fb950;--err:#f85149;--diff-bg:#26180b;--diff-b:#5c3412}}.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(5px);pointer-events:auto;display:flex;align-items:center;justify-content:center}.panel{background:var(--bg);color:var(--fg);width:390px;max-height:92vh;border-radius:12px;border:1px solid var(--border);box-shadow:0 24px 50px rgba(0,0,0,0.45);padding:18px 16px 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;display:flex;flex-direction:column;gap:10px;overflow-y:auto}.head{display:flex;justify-content:space-between;align-items:center}.head h3{font-size:13px;font-weight:700}.head-close{background:none;border:none;color:var(--sub);font-size:18px;cursor:pointer;padding:2px 6px;border-radius:4px}.head-close:hover{color:var(--fg)}.stats{background:var(--card);border:1px solid var(--card-b);border-radius:8px;padding:8px;display:grid;grid-template-columns:repeat(4,1fr);gap:4px;text-align:center}.stats-val{font-size:12px;font-weight:700;color:var(--fg)}.stats-lbl{font-size:9px;text-transform:uppercase;color:var(--sub);font-weight:600}.btn{all:unset;box-sizing:border-box;width:100%;padding:8px 12px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:opacity .15s}.btn:hover{opacity:.9}.btn-exp{background:var(--accent);color:#fff}.btn-sub{background:var(--card);color:var(--fg);border:1px solid var(--border)}.btn-danger{background:var(--err);color:#fff}.k-badge{font-size:9px;background:var(--kbd);padding:2px 5px;border-radius:4px;font-family:ui-monospace,Menlo,monospace;font-weight:700}.drop{border:1px dashed var(--border);border-radius:8px;padding:12px;text-align:center;cursor:pointer;background:var(--card);transition:border-color .15s}.drop.dragover{border-color:var(--accent)}.drop-t{font-size:11px;font-weight:600;color:var(--fg)}.drop-s{font-size:10px;color:var(--sub);margin-top:2px}.diff-box{background:var(--diff-bg);border:1px solid var(--diff-b);border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:6px}.diff-title{font-size:11px;font-weight:700;color:var(--accent);display:flex;justify-content:space-between}.diff-table{width:100%;border-collapse:collapse;font-size:11px}.diff-table td{padding:2px 0}.diff-old{color:var(--sub);text-decoration:line-through}.diff-arrow{color:var(--sub);padding:0 4px}.diff-new{font-weight:700;color:var(--fg)}.diff-new.chg{color:var(--accent)}.status{font-size:10px;color:var(--sub);text-align:center;min-height:14px}`;
    if (shadow.adoptedStyleSheets) {
        const s = new CSSStyleSheet();
        s.replaceSync(css);
        shadow.adoptedStyleSheets = [s]
    } else {
        const t = document.createElement("style");
        t.textContent = css;
        shadow.appendChild(t)
    }
    const curP = getSafe(KEYS[0]) || {},
        curG = getSafe(KEYS[2]) || {},
        curW = getSafe(KEYS[3]) || {};
    const wkg = p => p.weightKg && p.powerW ? (p.powerW / p.weightKg).toFixed(2) + " W/kg" : "—";
    const ov = document.createElement("div");
    ov.className = "overlay";
    ov.innerHTML = `<div class="panel" role="dialog" aria-modal="true"><div class="head"><h3>ZwiftBikes Garage</h3><button class="head-close" id="c">&times;</button></div><div class="stats"><div class="stats-item"><div class="stats-val">${curP.weightKg?curP.weightKg+" kg":"—"}</div><div class="stats-lbl">Gewicht</div></div><div class="stats-item"><div class="stats-val">${wkg(curP)}</div><div class="stats-lbl">Ratio</div></div><div class="stats-item"><div class="stats-val">${Object.keys(curG).length}</div><div class="stats-lbl">Fietsen</div></div><div class="stats-item"><div class="stats-val">${Object.keys(curW).length}</div><div class="stats-lbl">Wielen</div></div></div><button class="btn btn-exp" id="e"><span>Exporteer back-up</span><span class="k-badge">E</span></button><label class="drop" id="d"><input type="file" id="f" accept="application/json" style="display:none;"><div class="drop-t">Importeer JSON-bestand</div><div class="drop-s">Sleep bestand of klik <span class="k-badge">I</span></div></label><div id="preview" style="display:none;flex-direction:column;gap:8px;"></div><div class="status" id="st">Esc om te sluiten</div></div>`;
    shadow.appendChild(ov);
    document.body.appendChild(host);
    const st = ov.querySelector("#st"),
        fi = ov.querySelector("#f"),
        dz = ov.querySelector("#d"),
        pw = ov.querySelector("#preview");
    const close = () => host.remove();
    ov.querySelector("#c").onclick = close;
    ov.onclick = e => {
        if (e.target === ov) close()
    };
    const doExport = silent => {
        const out = {
            _version: 1,
            _exportedAt: new Date().toISOString()
        };
        KEYS.forEach(k => {
            const raw = localStorage.getItem(k);
            try {
                out[k] = JSON.parse(raw)
            } catch (e) {
                out[k] = raw
            }
        });
        const b = new Blob([JSON.stringify(out, null, 2)], {
            type: "application/json"
        });
        const u = URL.createObjectURL(b);
        const a = document.createElement("a");
        a.href = u;
        a.download = `zwiftbikes-garage-${fileStamp()}.json`;
        a.click();
        URL.revokeObjectURL(u);
        if (!silent) {
            st.style.color = "var(--succ)";
            st.textContent = "✓ Back-up gedownload"
        }
    };
    ov.querySelector("#e").onclick = () => doExport(false);
    const renderDiff = (data, fName) => {
        const nP = data[KEYS[0]] || {},
            nG = data[KEYS[2]] || {},
            nW = data[KEYS[3]] || {};
        const ts = data._exportedAt ? fmtTs(data._exportedAt) : "onbekend";
        const row = (lbl, o, n) => {
            const chg = String(o) !== String(n);
            return `<tr><td style="color:var(--sub);">${lbl}</td><td style="text-align:right;"><span class="diff-old">${o}</span><span class="diff-arrow">→</span><span class="diff-new ${chg?'chg':''}">${n}</span></td></tr>`
        };
        pw.innerHTML = `<div class="diff-box"><div class="diff-title"><span>Bestandscontrole</span><span>${ts}</span></div><table class="diff-table">${row("Gewicht",(curP.weightKg||"—")+" kg",(nP.weightKg||"—")+" kg")}${row("Vermogen",(curP.powerW||"—")+" W",(nP.powerW||"—")+" W")}${row("W/kg",wkg(curP),wkg(nP))}${row("Sprint",(curP.sprintPowerW||"—")+" W",(nP.sprintPowerW||"—")+" W")}${row("Fietsen",Object.keys(curG).length,Object.keys(nG).length)}${row("Wielen",Object.keys(curW).length,Object.keys(nW).length)}</table></div><button class="btn btn-sub" id="bak"><span>Eerst veilige back-up maken</span><span class="k-badge">B</span></button><button class="btn btn-danger" id="apply"><span>Weet je het zeker? Overschrijven</span><span class="k-badge">Enter</span></button>`;
        pw.style.display = "flex";
        dz.style.display = "none";
        ov.querySelector("#bak").onclick = () => doExport(true);
        const applyBtn = ov.querySelector("#apply");
        applyBtn.onclick = () => {
            KEYS.forEach(k => {
                if (Object.prototype.hasOwnProperty.call(data, k)) {
                    localStorage.setItem(k, JSON.stringify(data[k]))
                }
            });
            st.style.color = "var(--succ)";
            st.textContent = "✓ Gegevens overschreven. Herladen…";
            setTimeout(() => location.reload(), 700)
        };
        applyBtn.focus()
    };
    const handleFile = file => {
        if (!file) return;
        const r = new FileReader();
        r.onload = () => {
            try {
                const d = JSON.parse(r.result);
                const matched = KEYS.filter(k => Object.prototype.hasOwnProperty.call(d, k));
                if (!matched.length) throw new Error("Geen ZwiftBikes-data gevonden");
                renderDiff(d, file.name)
            } catch (err) {
                st.style.color = "var(--err)";
                st.textContent = `⚠ ${err.message||"Ongeldig bestand"}`
            }
        };
        r.readAsText(file)
    };
    fi.onchange = () => handleFile(fi.files[0]);
    dz.ondragover = e => {
        e.preventDefault();
        dz.classList.add("dragover")
    };
    dz.ondragleave = () => dz.classList.remove("dragover");
    dz.ondrop = e => {
        e.preventDefault();
        dz.classList.remove("dragover");
        handleFile(e.dataTransfer.files[0])
    };
    window.addEventListener("keydown", function onKey(e) {
        if (!document.getElementById("zbg-host")) return window.removeEventListener("keydown", onKey);
        if (e.key === "Escape") {
            e.preventDefault();
            close()
        }
        if (pw.style.display !== "none") {
            if (e.key === "Enter") {
                e.preventDefault();
                const ab = ov.querySelector("#apply");
                if (ab) ab.click()
            } else if (e.key.toLowerCase() === "b") {
                e.preventDefault();
                const bb = ov.querySelector("#bak");
                if (bb) bb.click()
            }
            return
        }
        const k = e.key.toLowerCase();
        if (k === "e" && !e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            doExport(false)
        } else if (k === "i" && !e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            fi.click()
        }
    })
})()