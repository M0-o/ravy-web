const steps = [
  {
    number: 1,
    title: "Choisissez un service",
    description:
      "Parcourez nos catégories et trouvez le service étudiant qui correspond à votre besoin.",
  },
  {
    number: 2,
    title: "Contactez l'étudiant",
    description:
      "Envoyez une demande avec les détails de votre projet. L'étudiant vous répond rapidement.",
  },
  {
    number: 3,
    title: "Suivez votre commande",
    description:
      "Restez en contact direct avec l'étudiant et suivez l'avancement de votre commande.",
  },
  {
    number: 4,
    title: "Évaluez & recommandez",
    description:
      "Satisfait du service ? Laissez un avis et recommandez l'étudiant à votre entourage.",
  },
]

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="scroll-mt-20 border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Comment ça marche</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            En quatre étapes simples, trouvez le service qu&apos;il vous faut
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-lg font-bold text-accent">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
