import { Slot } from '@radix-ui/react-slot';

export function Button({  asChild, ...props  } : { asChild?: boolean } & React.ComponentProps<typeof Slot>) {
  const Comp: any = asChild ? Slot : 'button';
  return <Comp {...props} className="rounded-md bg-rose-900 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-rose-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600" />;
}