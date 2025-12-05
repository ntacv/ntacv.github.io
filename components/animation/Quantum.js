import React from "react";

function Quantum() {
  return (
    <>
      <div class="zoom_animation">
        <img
          class="atom_background formula_ring"
          src="assets/Asset 2.png"
          alt="Foreground animation about quantum"
        />
        <img
          class="atom_background formula_1"
          src="assets/formula/formula_quantum (1).svg"
        />
        <img
          class="atom_background formula_2"
          src="assets/formula/formula_quantum (2).svg"
        />
        <img
          class="atom_background formula_3"
          src="assets/formula/formula_quantum (3).svg"
        />
        <img
          class="atom_background formula_4"
          src="assets/formula/formula_quantum (4).svg"
        />
        <img
          class="atom_background formula_5"
          src="assets/formula/formula_quantum (5).svg"
        />
      </div>

      <div class="zoom_animation mobile" style="display: none">
        <div class="right anim_bloc"></div>
        <div class="left anim_bloc"></div>
      </div>
    </>
  );
}

export default Quantum;
