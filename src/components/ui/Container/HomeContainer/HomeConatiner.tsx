type HomeContainerProps = {
    children: React.ReactNode;
}

export function HomeContainer({ children }: HomeContainerProps) {
    return(
        <div className="h-screen w-full bg-slate-50 font-sans text-slate-800 flex flex-col overflow-hidden">
            {children}
        </div>
    );
}