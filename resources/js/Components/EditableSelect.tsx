import TextInput from "./TextInput";

interface SelectProps {
    modelList: Categoria[];
}
export default function EditableSelect(props: SelectProps) {
    return (
        <div>
            <TextInput
                id="categoria-reservavel"
                type="text"
                name="categoria-reservavel"
                className="mt-1 block w-full"
                isFocused={true}
                onChange={(e) => {
                    const token = e.target.value.toLowerCase();

                    const newCategoria = props.modelList.find((model) =>
                        model.nome.toLowerCase().startsWith(token),
                    );

                    if (newCategoria != undefined) {
                        setData("categoria_id", newCategoria.id);
                    }
                }}
            />
            <datalist id="modelList">
                {props.modelList.map((model) => (
                    <option id={model.id.toString()} value={model.nome} />
                ))}
            </datalist>
        </div>
    );
}
