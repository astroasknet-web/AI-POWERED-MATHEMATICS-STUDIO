import { rng } from "../kit.mjs";

/**
 * The data model for the Power BI course: "Kiran Stores BI", a small retailer's sales in a star schema (one fact table, three dimension tables and a
 * calendar). All values are invented for teaching and generated with a fixed seed, so the model is identical on every build.
 */
const r = rng(909);
const pad = (n) => String(n).padStart(2, "0");

export const products = { name: "Products", columns: ["ProductID", "Product", "Category", "Price"], rows: [
  ["P1", "Notebook A5", "Stationery", 90], ["P2", "Gel pen pack", "Stationery", 120], ["P3", "Sticky notes", "Stationery", 60],
  ["P4", "Desk lamp", "Home", 750], ["P5", "Water bottle", "Home", 350], ["P6", "Backpack", "Home", 1250],
  ["P7", "USB cable", "Electronics", 199], ["P8", "Power bank", "Electronics", 1499],
] };
export const stores = { name: "Stores", columns: ["StoreID", "Store", "Region"], rows: [["S1", "Pune", "West"], ["S2", "Delhi", "North"], ["S3", "Chennai", "South"], ["S4", "Kolkata", "East"]] };

const COST_RATIO = { Stationery: 0.5, Home: 0.65, Electronics: 0.75 }; // cost as a share of the sale amount
const sales = [];
let id = 1;
for (let y = 2024; y <= 2025; y++) for (let m = 1; m <= 12; m++) for (let k = 0; k < 4; k++) {
  const day = r.int(1, 28), p = r.pick(products.rows), s = r.pick(stores.rows);
  const qty = r.int(1, 6) + (y === 2025 ? r.int(0, 2) : 0);
  const disc = r.pick([0, 0, 0.05, 0.1]);
  const amount = Math.round(qty * p[3] * (1 - disc));
  sales.push([id++, `${y}-${pad(m)}-${pad(day)}`, p[0], s[0], qty, amount, Math.round(amount * COST_RATIO[p[2]])]);
}
export const salesTable = { name: "Sales", columns: ["SaleID", "Date", "ProductID", "StoreID", "Qty", "Amount", "Cost"], rows: sales };
export const calendar = { name: "Dates", columns: [], rows: [], calendar: { from: "2024-01-01", to: "2025-12-31" } };

export const biModel = {
  tables: [products, stores, salesTable, calendar],
  relationships: [{ many: "Sales[ProductID]", one: "Products[ProductID]" }, { many: "Sales[StoreID]", one: "Stores[StoreID]" }, { many: "Sales[Date]", one: "Dates[Date]" }],
  measures: { "Total Sales": "SUM(Sales[Amount])", "Total Cost": "SUM(Sales[Cost])", "Order Count": "COUNTROWS(Sales)" },
  dateTable: "Dates",
};
/** The same model with extra ready-made measures (a lab starts from these). */
export const withMeasures = (extra) => ({ ...biModel, measures: { ...biModel.measures, ...extra } });

/** A small model for lessons: eight sales, so every number can be checked by eye. */
export const miniModel = {
  tables: [
    { name: "Products", columns: ["ProductID", "Product", "Category", "Price"], rows: [["P1", "Pen", "Stationery", 10], ["P2", "Book", "Stationery", 50], ["P3", "Lamp", "Home", 100]] },
    { name: "Stores", columns: ["StoreID", "Store", "Region"], rows: [["S1", "Pune", "West"], ["S2", "Delhi", "North"]] },
    { name: "Sales", columns: ["SaleID", "Date", "ProductID", "StoreID", "Qty", "Amount"], rows: [
      [1, "2024-01-10", "P1", "S1", 5, 50], [2, "2024-02-15", "P2", "S1", 2, 100], [3, "2024-03-20", "P3", "S2", 1, 100],
      [4, "2025-01-12", "P1", "S1", 10, 100], [5, "2025-02-10", "P2", "S2", 4, 200], [6, "2025-03-05", "P3", "S1", 3, 300], [7, "2025-03-25", "P1", "S2", 6, 60],
    ] },
    { name: "Dates", columns: [], rows: [], calendar: { from: "2024-01-01", to: "2025-12-31" } },
  ],
  relationships: [{ many: "Sales[ProductID]", one: "Products[ProductID]" }, { many: "Sales[StoreID]", one: "Stores[StoreID]" }, { many: "Sales[Date]", one: "Dates[Date]" }],
  measures: { "Total Sales": "SUM(Sales[Amount])" },
  dateTable: "Dates",
};
export default biModel;
