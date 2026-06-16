"use client";

import {
	Check,
	Minus,
	Plus,
	Search,
	ShoppingBag,
	ShoppingCart,
	Store,
	X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { buttonVariants } from "@/components/ui/button";

type Category = "Food" | "Drinks" | "Beauty";

type Product = {
	id: string;
	name: string;
	price: number;
	unit: string;
	category: Category;
	emoji: string;
	tag?: string;
};

const PRODUCTS: Product[] = [
	{
		id: "rice",
		name: "Long Grain Rice",
		price: 18.99,
		unit: "10kg bag",
		category: "Food",
		emoji: "🍚",
		tag: "Bestseller",
	},
	{
		id: "yam",
		name: "Pounded Yam Flour",
		price: 9.49,
		unit: "1.8kg",
		category: "Food",
		emoji: "🍠",
	},
	{
		id: "garri",
		name: "White Garri",
		price: 4.99,
		unit: "1.5kg",
		category: "Food",
		emoji: "🥣",
	},
	{
		id: "palm",
		name: "Red Palm Oil",
		price: 6.49,
		unit: "1 litre",
		category: "Food",
		emoji: "🫙",
	},
	{
		id: "egusi",
		name: "Ground Egusi (Melon Seed)",
		price: 5.99,
		unit: "500g",
		category: "Food",
		emoji: "🌰",
	},
	{
		id: "plantain",
		name: "Ripe Plantain",
		price: 0.79,
		unit: "each",
		category: "Food",
		emoji: "🍌",
		tag: "Fresh",
	},
	{
		id: "pepper",
		name: "Scotch Bonnet Peppers",
		price: 2.49,
		unit: "200g",
		category: "Food",
		emoji: "🌶️",
	},
	{
		id: "jollof",
		name: "Jollof Rice Spice Mix",
		price: 3.29,
		unit: "100g",
		category: "Food",
		emoji: "🧂",
	},
	{
		id: "stockfish",
		name: "Dried Stockfish",
		price: 8.99,
		unit: "200g",
		category: "Food",
		emoji: "🐟",
	},
	{
		id: "malta",
		name: "Malta Guinness",
		price: 6.99,
		unit: "6 × 330ml",
		category: "Drinks",
		emoji: "🥤",
		tag: "Popular",
	},
	{
		id: "zobo",
		name: "Hibiscus (Zobo) Drink",
		price: 2.99,
		unit: "1 litre",
		category: "Drinks",
		emoji: "🧃",
	},
	{
		id: "shea",
		name: "Raw Shea Butter",
		price: 5.49,
		unit: "250g",
		category: "Beauty",
		emoji: "🧴",
	},
	{
		id: "blacksoap",
		name: "African Black Soap",
		price: 4.49,
		unit: "200g",
		category: "Beauty",
		emoji: "🧼",
		tag: "Bestseller",
	},
	{
		id: "cocoa",
		name: "Cocoa Butter Lotion",
		price: 4.99,
		unit: "500ml",
		category: "Beauty",
		emoji: "🧴",
	},
];

const FILTERS: ("All" | Category)[] = ["All", "Food", "Drinks", "Beauty"];

const gbp = (n: number) =>
	new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
		n,
	);

export default function StorePage() {
	const [filter, setFilter] = useState<"All" | Category>("All");
	const [query, setQuery] = useState("");
	const [cart, setCart] = useState<Record<string, number>>({});
	const [cartOpen, setCartOpen] = useState(false);

	const visible = useMemo(() => {
		const q = query.trim().toLowerCase();
		return PRODUCTS.filter(
			(p) =>
				(filter === "All" || p.category === filter) &&
				(q === "" || p.name.toLowerCase().includes(q)),
		);
	}, [filter, query]);

	const cartLines = useMemo(
		() =>
			Object.entries(cart)
				.map(([id, qty]) => ({
					product: PRODUCTS.find((p) => p.id === id) as Product,
					qty,
				}))
				.filter((l) => l.product && l.qty > 0),
		[cart],
	);

	const itemCount = cartLines.reduce((n, l) => n + l.qty, 0);
	const subtotal = cartLines.reduce((s, l) => s + l.product.price * l.qty, 0);

	const add = (id: string) =>
		setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
	const dec = (id: string) =>
		setCart((c) => {
			const next = (c[id] ?? 0) - 1;
			const copy = { ...c };
			if (next <= 0) delete copy[id];
			else copy[id] = next;
			return copy;
		});

	return (
		<main className="flex-1">
			{/* Header */}
			<header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
				<div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
					<Link href="/" className="flex items-center gap-2.5">
						{/* biome-ignore lint/performance/noImgElement: simple static SVG mark */}
						<img src="/logo.svg" alt="Hull Superstore" className="size-9" />
						<span className="hidden font-heading text-lg font-semibold tracking-tight sm:block">
							Hull Superstore
						</span>
					</Link>

					<div className="relative flex-1 max-w-md">
						<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
						<input
							type="search"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search the store…"
							className="h-10 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
						/>
					</div>

					<button
						type="button"
						onClick={() => setCartOpen(true)}
						className="relative grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/85"
						aria-label="Open basket"
					>
						<ShoppingCart className="size-5" />
						{itemCount > 0 && (
							<span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-green px-1 text-xs font-semibold text-green-foreground">
								{itemCount}
							</span>
						)}
					</button>
				</div>
			</header>

			{/* Banner */}
			<section className="border-b border-border bg-secondary/40">
				<div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
							<Store className="size-3.5 text-primary" /> Reserve online ·
							Collect in store
						</span>
						<h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
							Shop African groceries
						</h1>
						<p className="mt-2 max-w-lg text-muted-foreground text-pretty">
							Browse the shelves, build your basket and reserve for collection
							on Beverley Road — pay when you pick up.
						</p>
					</div>
				</div>
			</section>

			{/* Filters + grid */}
			<section className="mx-auto max-w-6xl px-5 py-10">
				<div className="flex flex-wrap gap-2">
					{FILTERS.map((f) => (
						<button
							key={f}
							type="button"
							onClick={() => setFilter(f)}
							className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
								filter === f
									? "border-primary bg-primary text-primary-foreground"
									: "border-border bg-card text-muted-foreground hover:text-foreground"
							}`}
						>
							{f}
						</button>
					))}
				</div>

				<div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
					{visible.map((p) => {
						const qty = cart[p.id] ?? 0;
						return (
							<article
								key={p.id}
								className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
							>
								<div className="relative grid aspect-square place-items-center bg-gradient-to-br from-secondary to-accent text-6xl">
									<span aria-hidden>{p.emoji}</span>
									{p.tag && (
										<span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
											{p.tag}
										</span>
									)}
								</div>
								<div className="flex flex-1 flex-col p-4">
									<h3 className="font-medium leading-tight">{p.name}</h3>
									<p className="mt-0.5 text-sm text-muted-foreground">
										{p.unit}
									</p>
									<div className="mt-3 flex items-center justify-between gap-2">
										<span className="font-heading text-lg font-semibold">
											{gbp(p.price)}
										</span>
										{qty === 0 ? (
											<button
												type="button"
												onClick={() => add(p.id)}
												className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
											>
												<Plus className="size-4" /> Add
											</button>
										) : (
											<div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-1.5 py-1">
												<button
													type="button"
													onClick={() => dec(p.id)}
													className="grid size-6 place-items-center rounded-full hover:bg-muted"
													aria-label={`Remove one ${p.name}`}
												>
													<Minus className="size-3.5" />
												</button>
												<span className="min-w-4 text-center text-sm font-semibold">
													{qty}
												</span>
												<button
													type="button"
													onClick={() => add(p.id)}
													className="grid size-6 place-items-center rounded-full hover:bg-muted"
													aria-label={`Add one ${p.name}`}
												>
													<Plus className="size-3.5" />
												</button>
											</div>
										)}
									</div>
								</div>
							</article>
						);
					})}
				</div>

				{visible.length === 0 && (
					<p className="py-16 text-center text-muted-foreground">
						No products match “{query}”.
					</p>
				)}
			</section>

			{/* Cart drawer */}
			{cartOpen && (
				<button
					type="button"
					aria-label="Close basket"
					onClick={() => setCartOpen(false)}
					className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-[2px]"
				/>
			)}
			<aside
				className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ${
					cartOpen ? "translate-x-0" : "translate-x-full"
				}`}
				aria-hidden={!cartOpen}
			>
				<div className="flex items-center justify-between border-b border-border px-5 py-4">
					<h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
						<ShoppingBag className="size-5 text-primary" /> Your basket
					</h2>
					<button
						type="button"
						onClick={() => setCartOpen(false)}
						className="grid size-8 place-items-center rounded-full hover:bg-muted"
						aria-label="Close basket"
					>
						<X className="size-5" />
					</button>
				</div>

				<div className="flex-1 overflow-y-auto px-5">
					{cartLines.length === 0 ? (
						<div className="grid h-full place-items-center text-center text-muted-foreground">
							<div>
								<ShoppingCart className="mx-auto size-10 opacity-40" />
								<p className="mt-3">Your basket is empty</p>
							</div>
						</div>
					) : (
						<ul className="divide-y divide-border">
							{cartLines.map((l) => (
								<li key={l.product.id} className="flex gap-3 py-4">
									<span className="grid size-14 shrink-0 place-items-center rounded-xl bg-secondary text-2xl">
										{l.product.emoji}
									</span>
									<div className="flex-1">
										<p className="font-medium leading-tight">
											{l.product.name}
										</p>
										<p className="text-sm text-muted-foreground">
											{gbp(l.product.price)} · {l.product.unit}
										</p>
										<div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border px-1.5 py-1">
											<button
												type="button"
												onClick={() => dec(l.product.id)}
												className="grid size-6 place-items-center rounded-full hover:bg-muted"
												aria-label={`Remove one ${l.product.name}`}
											>
												<Minus className="size-3.5" />
											</button>
											<span className="min-w-4 text-center text-sm font-semibold">
												{l.qty}
											</span>
											<button
												type="button"
												onClick={() => add(l.product.id)}
												className="grid size-6 place-items-center rounded-full hover:bg-muted"
												aria-label={`Add one ${l.product.name}`}
											>
												<Plus className="size-3.5" />
											</button>
										</div>
									</div>
									<span className="font-semibold">
										{gbp(l.product.price * l.qty)}
									</span>
								</li>
							))}
						</ul>
					)}
				</div>

				<div className="border-t border-border px-5 py-4">
					<div className="flex items-center justify-between text-sm text-muted-foreground">
						<span>Subtotal</span>
						<span className="font-semibold text-foreground">
							{gbp(subtotal)}
						</span>
					</div>
					<p className="mt-1 flex items-center gap-1.5 text-xs text-green">
						<Check className="size-3.5" /> Free click &amp; collect — pay in
						store
					</p>
					<button
						type="button"
						disabled={cartLines.length === 0}
						className={buttonVariants({
							size: "lg",
							className: "mt-4 w-full rounded-full disabled:opacity-50",
						})}
					>
						Reserve for collection
					</button>
				</div>
			</aside>
		</main>
	);
}
