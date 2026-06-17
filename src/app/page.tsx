import {
	Clock,
	Leaf,
	MapPin,
	Phone,
	ShoppingBag,
	ShoppingBasket,
	Sparkles,
	Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Store details. Confirmed items are from Companies House + Google Maps.
// TODO items must be supplied by the owner before launch.
// ---------------------------------------------------------------------------
const store = {
	name: "Hull Superstore",
	tagline: "African foods, drinks & beauty — on Beverley Road, Hull",
	address: "Newlands House, Beverley Road, Hull, HU5 1NR",
	mapsUrl: "https://maps.google.com/?q=Hull+Superstore+Beverley+Road+HU5+1NR",
	mapEmbed:
		"https://www.google.com/maps?q=53.7675418,-0.3542095&z=16&output=embed",
	rating: "4.9",
	reviewCount: "8",
	// TODO: confirm with owner
	phone: "01482 000000",
	phoneHref: "tel:+441482000000",
	hours: [
		{ day: "Monday – Saturday", time: "9:00am – 8:00pm" },
		{ day: "Sunday", time: "10:00am – 6:00pm" },
	],
};

const categories = [
	{
		icon: ShoppingBasket,
		title: "African Foods",
		body: "Pantry staples, grains, flours, spices and authentic ingredients for your favourite dishes.",
	},
	{
		icon: Leaf,
		title: "Drinks & Provisions",
		body: "Soft drinks, malt, juices and everyday provisions — all in one welcoming shop.",
	},
	{
		icon: Sparkles,
		title: "Toiletries & Beauty",
		body: "A wide range of toiletries, hair care and beauty products for the whole family.",
	},
];

const reviews = [
	{
		quote:
			"Very large selection of African foods, drinks, toiletries and beauty products, friendly service and spacious environment.",
		author: "Rhys C.",
		meta: "Local Guide",
	},
	{
		quote:
			"Went here today — great shop and great owners. Had everything you need.",
		author: "B. Rr",
		meta: "Local Guide · 22 reviews",
	},
	{
		quote: "Great shop & wonderful customer service.",
		author: "Sakeeb A.",
		meta: "8 reviews",
	},
];

function Stars() {
	return (
		<span className="inline-flex items-center gap-0.5 text-gold">
			{["a", "b", "c", "d", "e"].map((id) => (
				<Star key={id} className="size-4 fill-current" aria-hidden />
			))}
		</span>
	);
}

export default function Home() {
	return (
		<main className="flex-1">
			{/* Header */}
			<header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
					<Link href="/" className="flex items-center gap-2.5">
						<Image
							src="/logo.svg"
							alt="Hull Superstore logo"
							width={36}
							height={36}
							className="size-9"
							priority
						/>
						<span className="font-heading text-lg font-semibold tracking-tight">
							Hull Superstore
						</span>
					</Link>
					<nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground sm:flex">
						<a href="#shop" className="transition-colors hover:text-foreground">
							What we sell
						</a>
						<a
							href="#reviews"
							className="transition-colors hover:text-foreground"
						>
							Reviews
						</a>
						<a
							href="#visit"
							className="transition-colors hover:text-foreground"
						>
							Visit us
						</a>
						<Link
							href="/store"
							className="transition-colors hover:text-foreground"
						>
							Shop online
						</Link>
					</nav>
					<Link
						href="/store"
						className={buttonVariants({
							size: "sm",
							className: "rounded-full",
						})}
					>
						<ShoppingBag className="size-4" /> Shop online
					</Link>
				</div>
			</header>

			{/* Hero */}
			<section className="relative overflow-hidden">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
					style={{
						backgroundImage:
							"radial-gradient(circle at 1px 1px, var(--terracotta) 1px, transparent 0)",
						backgroundSize: "22px 22px",
					}}
				/>
				<div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
					<div>
						<span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-sm font-medium text-secondary-foreground">
							<MapPin className="size-4 text-primary" /> Beverley Road, Hull ·
							HU5 1NR
						</span>
						<h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
							Your local home of{" "}
							<span className="text-primary">African groceries</span> in Hull
						</h1>
						<p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
							A large, spacious shop stocked with African foods, drinks,
							toiletries and beauty products — run by friendly owners who love a
							chat. Come and find everything you need under one roof.
						</p>
						<div className="mt-8 flex flex-wrap items-center gap-3">
							<a
								href="#visit"
								className={buttonVariants({
									size: "lg",
									className: "rounded-full",
								})}
							>
								<MapPin className="size-4" /> Find the shop
							</a>
							<a
								href={store.phoneHref}
								className={buttonVariants({
									size: "lg",
									variant: "outline",
									className: "rounded-full",
								})}
							>
								<Phone className="size-4" /> {store.phone}
							</a>
						</div>
						<div className="mt-8 flex items-center gap-3 text-sm">
							<Stars />
							<span className="font-semibold text-foreground">
								{store.rating}
							</span>
							<span className="text-muted-foreground">
								from {store.reviewCount} Google reviews
							</span>
						</div>
					</div>

					{/* Hero card */}
					<div className="relative">
						<div className="rounded-3xl border border-border bg-card p-2 shadow-xl shadow-primary/5">
							<div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-primary/90 via-terracotta to-green">
								<Image
									src="/hero.jpg"
									alt="Hull Superstore shopfront on Beverley Road, Hull"
									fill
									priority
									sizes="(min-width: 768px) 40vw, 100vw"
									className="object-cover"
								/>
							</div>
						</div>
						<div className="absolute -bottom-5 -left-5 rotate-[-4deg] rounded-2xl border border-border bg-card px-5 py-3 shadow-lg">
							<p className="font-heading text-sm font-semibold">
								Friendly, welcoming service
							</p>
							<p className="text-xs text-muted-foreground">
								“The owners were very hospitable”
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* What we sell */}
			<section id="shop" className="border-t border-border bg-secondary/40">
				<div className="mx-auto max-w-6xl px-5 py-20">
					<div className="max-w-2xl">
						<h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
							What you’ll find in store
						</h2>
						<p className="mt-3 text-muted-foreground text-pretty">
							A genuinely large selection across food, drink and everyday
							essentials — with new stock arriving regularly.
						</p>
					</div>
					<div className="mt-12 grid gap-6 sm:grid-cols-3">
						{categories.map((c) => (
							<div
								key={c.title}
								className="rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-md"
							>
								<span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
									<c.icon className="size-6" />
								</span>
								<h3 className="mt-5 font-heading text-xl font-semibold">
									{c.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{c.body}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Reviews */}
			<section id="reviews" className="mx-auto max-w-6xl px-5 py-20">
				<div className="flex flex-col items-center text-center">
					<Stars />
					<h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
						Loved by the neighbourhood
					</h2>
					<p className="mt-3 max-w-xl text-muted-foreground text-pretty">
						Rated {store.rating} out of 5 on Google. Here’s what local shoppers
						have to say.
					</p>
				</div>
				<div className="mt-12 grid gap-6 md:grid-cols-3">
					{reviews.map((r) => (
						<figure
							key={r.author}
							className="flex flex-col rounded-2xl border border-border bg-card p-7"
						>
							<Stars />
							<blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">
								“{r.quote}”
							</blockquote>
							<figcaption className="mt-5 text-sm">
								<span className="font-semibold">{r.author}</span>
								<span className="block text-muted-foreground">{r.meta}</span>
							</figcaption>
						</figure>
					))}
				</div>
			</section>

			{/* Visit / location */}
			<section id="visit" className="border-t border-border bg-secondary/40">
				<div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
					<div>
						<h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
							Come and visit us
						</h2>
						<p className="mt-3 text-muted-foreground text-pretty">
							You’ll find us on Beverley Road — easy to reach and with a
							spacious shop floor to browse.
						</p>

						<ul className="mt-8 space-y-5">
							<li className="flex gap-4">
								<span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
									<MapPin className="size-5" />
								</span>
								<div>
									<p className="font-semibold">Address</p>
									<p className="text-muted-foreground">{store.address}</p>
									<a
										href={store.mapsUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="mt-1 inline-block text-sm font-medium text-primary hover:underline"
									>
										Get directions →
									</a>
								</div>
							</li>
							<li className="flex gap-4">
								<span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
									<Phone className="size-5" />
								</span>
								<div>
									<p className="font-semibold">Phone</p>
									<a
										href={store.phoneHref}
										className="text-muted-foreground hover:text-primary"
									>
										{store.phone}
									</a>
								</div>
							</li>
							<li className="flex gap-4">
								<span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
									<Clock className="size-5" />
								</span>
								<div>
									<p className="font-semibold">Opening hours</p>
									<dl className="mt-1 space-y-1 text-sm text-muted-foreground">
										{store.hours.map((h) => (
											<div key={h.day} className="flex gap-3">
												<dt className="w-40">{h.day}</dt>
												<dd className="font-medium text-foreground">
													{h.time}
												</dd>
											</div>
										))}
									</dl>
								</div>
							</li>
						</ul>
					</div>

					<div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
						<iframe
							title="Map showing Hull Superstore on Beverley Road, Hull"
							src={store.mapEmbed}
							className="h-full min-h-80 w-full"
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-border">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row">
					<div className="flex items-center gap-2.5">
						<Image
							src="/logo.svg"
							alt="Hull Superstore logo"
							width={28}
							height={28}
							className="size-7"
						/>
						<span className="font-medium text-foreground">Hull Superstore</span>
					</div>
					<p>{store.address}</p>
					<p>© {new Date().getFullYear()} Hull Superstore Ltd</p>
				</div>
			</footer>
		</main>
	);
}
