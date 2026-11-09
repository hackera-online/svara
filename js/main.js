/* Калкулатор: чете цените директно от таблицата в index.html.
   Променяш цена само в таблицата, калкулаторът я следва автоматично. */
(function () {
  "use strict";
  var t = document.getElementById("price-table");
  var f = document.getElementById("calc-form");
  if (!t || !f) return;

  var rows = [].slice.call(t.tBodies[0].rows);
  var sizes = [].slice.call(t.tHead.rows[0].cells, 1).map(function (c) { return c.textContent.trim(); });
  rows.forEach(function (r) { [].forEach.call(r.cells, function (c, i) { if (i) c.setAttribute("data-size", sizes[i - 1]); }); });
  var vSel = document.getElementById("vehicle");
  var zSel = document.getElementById("size");
  var out = document.getElementById("total-price");

  rows.forEach(function (r, i) { vSel.add(new Option(r.cells[0].textContent.trim(), i)); });
  sizes.forEach(function (s, i) { zSel.add(new Option(s, i)); });
  zSel.value = 3; // 16"

  function val(r, s) {
    var n = parseInt(rows[r].cells[s + 1].textContent, 10);
    return isNaN(n) ? null : n;
  }

  function calc() {
    var r = +vSel.value, s = +zSel.value;
    [].forEach.call(zSel.options, function (o, i) { o.disabled = val(r, i) === null; });
    if (val(r, s) === null) {
      for (var i = 0; i < sizes.length; i++) { if (val(r, i) !== null) { s = i; break; } }
      zSel.value = s;
    }
    var total = val(r, s) * (f.elements.runflat.checked ? 1.5 : 1);
    out.textContent = String(total).replace(".", ",") + " €";
    [].forEach.call(t.querySelectorAll("td.hit"), function (c) { c.classList.remove("hit"); });
    rows[r].cells[s + 1].classList.add("hit");
  }

  f.addEventListener("input", calc);
  f.addEventListener("submit", function (e) { e.preventDefault(); });
  calc();
})();

/* Заявка за час: сглобява SMS към сервиза */
(function () {
  "use strict";
  var f = document.getElementById("book-form");
  if (!f) return;
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var g = function (n) { return (f.elements[n].value || "").trim(); };
    var text = "Здравейте, искам час за: " + g("svc") +
      (g("car") ? ". Автомобил и гуми: " + g("car") : "") +
      (g("when") ? ". Желан час: " + g("when") : "") +
      (g("name") ? ". Име: " + g("name") : "") + ".";
    window.location.href = "sms:+359899821102?&body=" + encodeURIComponent(text);
  });
})();

/* Меню за телефони */
(function () {
  "use strict";
  var b = document.getElementById("menu-toggle"), n = document.getElementById("nav");
  if (!b || !n) return;
  function set(o) { n.classList.toggle("open", o); b.setAttribute("aria-expanded", o ? "true" : "false"); }
  b.addEventListener("click", function () { set(!n.classList.contains("open")); });
  n.addEventListener("click", function (e) { if (e.target.tagName === "A") set(false); });
})();

/* Снимка в hero: ако файлът липсва, остава илюстрацията отзад */
(function () {
  "use strict";
  var img = document.querySelector(".hero-img");
  if (!img) return;
  function drop() { img.remove(); }
  img.addEventListener("error", drop);
  if (img.complete && img.naturalWidth === 0) drop();
})();
