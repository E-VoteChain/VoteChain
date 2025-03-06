export function HowItWorks() {
  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-[800px] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            How VoteChain Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Our blockchain voting platform ensures security, transparency, and ease of use at every
            step.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-border md:block"></div>

          <div className="space-y-12 md:space-y-24">
            <div className="relative grid gap-8 md:grid-cols-2">
              <div className="flex md:justify-end">
                <div className="relative max-w-md md:text-right">
                  <h3 className="mb-2 text-xl font-bold">Create an Election</h3>
                  <p className="text-muted-foreground">
                    Set up your election with candidates, voting rules, and duration. Customize
                    authentication methods to ensure only eligible voters participate.
                  </p>
                </div>
              </div>
              <div className="md:pt-16"></div>
            </div>

            <div className="relative grid gap-8 md:grid-cols-2">
              <div className="md:pt-16"></div>
              <div className="flex">
                <div className="relative max-w-md">
                  <h3 className="mb-2 text-xl font-bold">Secure Voter Authentication</h3>
                  <p className="text-muted-foreground">
                    Voters verify their identity through secure methods like email verification,
                    wallet connection, or custom authentication systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative grid gap-8 md:grid-cols-2">
              <div className="flex md:justify-end">
                <div className="relative max-w-md md:text-right">
                  <h3 className="mb-2 text-xl font-bold">Cast Secure Votes</h3>
                  <p className="text-muted-foreground">
                    Voters make their selections through an intuitive interface. Each vote is
                    encrypted and securely recorded on the blockchain.
                  </p>
                </div>
              </div>
              <div className="md:pt-16"></div>
            </div>

            <div className="relative grid gap-8 md:grid-cols-2">
              <div className="md:pt-16"></div>
              <div className="flex">
                <div className="relative max-w-md">
                  <h3 className="mb-2 text-xl font-bold">Transparent Results</h3>
                  <p className="text-muted-foreground">
                    Results are tallied automatically and can be independently verified through the
                    blockchain, ensuring complete transparency while maintaining voter privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
