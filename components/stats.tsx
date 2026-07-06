export default function Stats() {
  return (
    <section className="border-y border-border bg-secondary/5" id="a-propos">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl font-bold tracking-tight text-accent sm:text-4xl">
              120<span className="text-foreground">+</span>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">étudiants actifs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold tracking-tight text-accent sm:text-4xl">
              5
            </div>
            <div className="mt-1 text-sm text-muted-foreground">catégories de services</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold tracking-tight text-accent sm:text-4xl">
              98<span className="text-foreground">%</span>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">clients satisfaits</div>
          </div>
        </div>
      </div>
    </section>
  )
}
