import type { Section } from '../types'

export const storageModelsSection: Section = {
  id: 'storage-models',
  title: 'Relational, key-value, document and wide-column storage',
  scene: 'store-models',
  slide: `## Compare models by access pattern

These are typical tendencies; products differ.

### Four models
- **Relational:** tables, joins, constraints, transactions
- **Key-value:** fast lookup by one key
- **Document:** nested records read and written as a unit
- **Wide-column:** very high write volume, queries designed around a key

### Fit for our data
- \`links\`: relational, or key-value if lookups dominate and rules stay simple
- \`clicks\`: wide-column or an append-friendly store at high volume

### The rule
- Choose by **access pattern and invariants**, not by fashion`,
  narration:
    "There are four broad storage models, and each is shaped for particular access patterns. These are typical tendencies, because individual products differ. A relational database gives you tables, joins, constraints and transactions, which is ideal when rules matter, but scaling its writes across machines takes deliberate work. A key-value store is excellent at one thing, looking a value up by its key, such as a code to a long address, but offers little in the way of querying. A document store keeps a nested record together so it can be read and written as one unit, but rules that span several records are often weaker. A wide-column store handles very heavy write volume, with data grouped by key, but you design the tables around the questions you will ask. For our data, the links might be relational, or key-value if lookups dominate and the rules stay simple. The clicks, arriving at hundreds of events a second, might suit a wide-column or other append-friendly store. The rule is to choose by access pattern and invariants, not by fashion.",
}
