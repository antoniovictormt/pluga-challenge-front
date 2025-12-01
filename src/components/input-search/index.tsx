import Image from "next/image"

type SearchInputProps = {
    value: string
    onChange: (value: string) => void
}

export const SearchInput = ({ onChange, value }: SearchInputProps) => {
    return (
        <label className="input w-full items-center gap-2 shadow-sm hover:shadow-lg">
            <Image
                src="/icons/search.svg"
                alt="Ícone de busca"
                width={16}
                height={16}
                className="opacity-50"
            />

            <input
                type="search"
                placeholder="Buscar ferramenta"
                value={value}
                onChange={evt => onChange(evt.target.value)}
                className="w-full"
            />
        </label>
    )
}
