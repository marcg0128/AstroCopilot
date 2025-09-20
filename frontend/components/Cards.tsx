export default function Cards({props}: {props: {imageUrl: string, title: string, description: string}}) {
    return (
        <div className="max-w-sm bg-gray-900 rounded-2xl shadow-lg border-2 border-[#171717] hover:border-[#f97316] overflow-visible hover:shadow-xl transition-all duration-800 ease-out transform hover:-translate-y-1 relative group">
            {props.imageUrl && (
                <img className="w-full h-48 object-cover rounded-t-2xl" src={props.imageUrl} alt={props.title} />
            )}
            <div className="p-6 space-y-4">
                <div className="font-bold text-xl text-white">{props.title}</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {props.description}
                </p>
            </div>

            <button className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-[#f97316] hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-3xl transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 shadow-lg">
                More info
            </button>
        </div>


    );

}