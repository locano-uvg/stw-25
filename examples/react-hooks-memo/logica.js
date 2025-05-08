function UserSearch() {
  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState([
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
  const [newUser, setNewUser] = React.useState({
    name: "",
    description: ""
  });
  

  // // useMemo para filtrar usuarios sólo si cambia search o users
  const filteredUsers = React.useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  function addUser() {
    setUsers([...users, newUser]);
    setNewUser({
      name: "",
      description: ""
    });
  }


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
          <li key={index}>{user.name} - {user.description}</li>
        ))}
      </ul>
      <input type="text" placeholder="Nombre" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} />
      <input type="text" placeholder="Descripción" value={newUser.description} onChange={(e) => setNewUser({...newUser, description: e.target.value})}  />
      <button onClick={addUser}>Agregar Usuario</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UserSearch />);