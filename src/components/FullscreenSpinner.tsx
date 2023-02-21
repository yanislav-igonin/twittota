import { Spinner } from "./Spinner";

export const FullscreenSpinner = () =>
  <div className='w-screen h-screen flex justify-center items-center'>
    <Spinner width={40} height={40} />
  </div>