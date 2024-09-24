type ProjectNameProps = {
  children?: React.ReactNode;
  count: number;
};

export default function ProjectName({ children, count }: ProjectNameProps) {
  return (
    <div>
      <div className="flex items-center gap-x-2 md:gap-x-3 dark:text-white">
        <h1 className="my-1 text-3xl font-semibold tracking-tight scroll-m-20 lg:text-4xl">
          {children}
        </h1>
        <div className="grid border border-gray-200 rounded-md w-9 h-7 place-content-center dark:border-gray-700 dark:text-gray-400">
          <span aria-label="Tasks count" className="text-lg font-semibold">
            {count}
          </span>
        </div>
      </div>
    </div>
  );
}
