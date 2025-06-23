import Image from "next/image";

export default function BrandsRibbon() {
    const carBrands = [
        {id: "ford", url: "/ford.svg", height: 60, width: 100},
        {id: "vw", url: "/vw.svg", height: 20, width: 50},
        {id: "bmw", url: "/bmw.svg", height: 20, width: 50},
        {id: "benz", url: "/benz.svg", height: 20, width: 50},
        {id: "jaguar", url: "/jaguar.svg", height: 50, width: 90},
        {id: "land-rover", url: "/land-rover.svg", height: 50, width: 90},
        {id: "hyundai", url: "/hyundai.svg", height: 50, width: 90},
    ]
    return (
        <section className="flex overflow-x-auto overflow-y-hidden items-center justify-around w-full h-24 bg-neutral-200 gap-10 px-10">
            {carBrands.map((brand) => (
                <Image
                    key={brand.id}
                    src={brand.url}
                    alt={brand.id}
                    width={brand.width}
                    height={brand.height}
                    className="object-contain"
                />
            ))}

        </section>
    );
}
