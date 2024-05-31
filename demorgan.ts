import {And, Or, Neg, Iff} from './core.js';

// and_commute_fwd: P∧Q -> Q∧P
function and_commute_fwd<P, Q>(pq: And<P, Q>): And<Q, P> {
  const p = pq.left;
  const q = pq.right;
  return And.intro(q, p);
}

// and_commute: P∧Q ↔ Q∧P
export function and_commute<P, Q>(): Iff<And<P, Q>, And<Q, P>> {
  return Iff.intro(
    pq => and_commute_fwd(pq),
    qp => and_commute_fwd(qp),
  );
}

const ab_comm = and_commute<"A", "B">();
declare let ab: And<"A", "B">;
const ba = ab_comm.elim_left()(ab);
//    ^? const ba: And<"B", "A">

function demorgan_fwd<P, Q>(npq: Neg<Or<P, Q>>): And<Neg<P>, Neg<Q>> {
  return And.intro(
      (p) => npq(Or.intro_left(p)),
      (q) => npq(Or.intro_right(q)),
  );
}

// demorgan: ¬(p ∨ q) ↔ (¬p ∧ ¬q)
export function demorgan<P, Q>(): Iff<Neg<Or<P, Q>>, And<Neg<P>, Neg<Q>>> {
  return Iff.intro(
    (mp) => demorgan_fwd(mp),
    (mpr) => {
      const np = mpr.left;  // Neg<P>
      const nq = mpr.right;  // Neg<Q>
      // goal: Neg<Or<P, Q>>
      return (or) => or.cases(np, nq);
    },
  );
}
