export const Appbar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  


    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4 font-bold">
            <span className=" p-2 rounded text-[#1f2937] [text-shadow:_2px_0_29px_rgb(0_0_0)]">

            PAYMENTS APP
            </span>
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 font-medium">
                {user?.firstName}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                {user?.firstName[0]}
                </div>
            </div>
        </div>
    </div>
}