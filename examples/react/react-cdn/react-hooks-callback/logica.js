function UserSearch() {
  const [search, setSearch] = React.useState("");
  const [users] = React.useState([
    {
      name: "John",
      description: "John is a software engineer"
    },
    {
      name: "Jane",
      description: "Jane is a software engineer"
    },
    {
      name: "Jim",
      description: "Jim is a software engineer"
    },
    {
      name: "Jill",
      description: "Jill is a software engineer"
    }
  ]);

  // useMemo para filtrar usuarios sólo si cambia search o users
  const filteredUsers = React.useMemo(() => {
    console.log("Filtrando usuarios...");
    return users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);
 

  return (
    <div>
      <h1>Buscar Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UserSearch />);