import Image from "next/image";
import prisma from "@/lib/prisma";
import JobListItem from "@/components/JobListItem";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where:{approved:true},
    orderBy:{createdAt:"desc"},
  })
  console.log()
  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight  lg:text-5xl">Developers Jobs</h1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section>
         <div className="space-y-4">
          {jobs.map((item,index)=>(
            <JobListItem job={item} key={item.id}/>
          ))}
        </div>
      </section>


    </main>
  );
}
