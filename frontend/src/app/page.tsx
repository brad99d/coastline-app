// @/app/page.tsx

import { JSX } from "react";
import { TestRequest } from '@/components/request'

export default function Home(): JSX.Element {
  return (
      <div className="w-full flex flex-col min-h-screen justify-center items-center">
          <span>Hello, world!</span>
          <TestRequest />
      </div>
  );
}
