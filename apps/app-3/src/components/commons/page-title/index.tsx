type PageTitleProps = {
  children: string
}

export const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <h1 className='pb-4 text-2xl text-zinc-800 font-semibold border-b border-zinc-300'>
      {children}
    </h1>
  )
}
