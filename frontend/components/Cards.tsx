export default function Cards({props}: {props: {imageUrl: string, title: string, description: string}}) {
    return (
        <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg m-4 bg-gray-900">
            <img className="w-full" src={props.imageUrl} alt={props.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.title}</div>
                <p className="text-gray-700 text-base">
                    {props.description}
                </p>
            </div>
        </div>
    );

}