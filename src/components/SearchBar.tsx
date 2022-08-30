export default function SearchBar(props: any) {
  const handleChange = (e: any) => {
    e.preventDefault();
    const filteredPorts = props.ports.filter(
        (port: any) => port.name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    props.setFilteredPorts(filteredPorts);
  }
  return (
    <div className="flex items-center w-full">
      <input
        type="text"
        className="bg-crust w-full lg:w-full md:w-full placeholder:text-zinc-300 focus:outline-none border-none p-2 text-zinc-200 rounded shadow-2xl"
        placeholder="Search ..."
        onChange={handleChange}
      />
    </div>
  );
}