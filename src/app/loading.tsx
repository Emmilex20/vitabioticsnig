import Container from "@/components/shared/container";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef5ff_0%,#f8fbff_45%,#ffffff_100%)] py-16">
      <Container>
        <div className="mx-auto max-w-6xl animate-pulse space-y-8">
          <div className="space-y-4">
            <div className="h-4 w-28 rounded-full bg-blue-100" />
            <div className="h-14 max-w-2xl rounded-3xl bg-slate-200" />
            <div className="h-6 max-w-3xl rounded-2xl bg-slate-100" />
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-6">
              <div className="h-72 rounded-[2rem] bg-white shadow-sm" />
              <div className="h-80 rounded-[2rem] bg-white shadow-sm" />
            </div>
            <div className="h-96 rounded-[2rem] bg-white shadow-sm" />
          </div>
        </div>
      </Container>
    </div>
  );
}
