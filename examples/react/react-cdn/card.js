
function Hijo(props){
    // STATE
    // const[image, setImage] = React.useState('https://cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/POVLIAGHSJAKZMUTFV2TR23JVM.jpg');
    // const[title, setTitle] = React.useState('Luffy');
    // const[description, setDescription] = React.useState('Rey de los piratas');
    // const [contador, setContador] = React.useState(0)


    // React.useEffect(() =>{

    //     console.log(props)
    //     if(props.background == 'yellow'){
    //         setTitle('Bienvenido')
    //     }else{
    //         setTitle('Mejor adios')

    //     }
    // });


    async function getData(){
       let data = await fetch('https://pokeapi.co/api/v2/pokemon/ditto').then((data)=>{
        return data.json()
       });

       console.log(data.name);
       props.setUsuario(data.name)
       
       
    }

    return(        
     
               <div style={{
                backgroundColor: props.background,
                border: props.border,
                width: props.width
               }}>
                <h3>Realmente eres el usuario {props.usuario}</h3>
                 <button onClick={()=>{
                   
                   props.setUsuario('Muchas gracias' + props.usuario)
                    
                }}>Si</button>
                
                <button onClick={()=>{
                   props.setUsuario('Soy lud')
                   getData()
                }}>No</button>
               </div>
    ) ;

}

function Padre(props){
    const [user, setUser] = React.useState('Nadissa')
    
    let hijos = [
        {
            usuario: "user1",
            background: 'red',
            width: '100px'
        },
        {
            usuario: "user2",
            background: 'blue',
            width: '300px'

        },
    ]

    return (
        <div className="card">
            <h1>Bienvid@ {user}</h1>
            <p>Su id es: {props.id} {user}</p>
            <h3>Adios {user}</h3>

            <button onClick={()=>{
                setUser('hola')
            }}></button>
            
            {hijos.map((hijo)=>{
                return <Hijo usuario={hijo.usuario} setUsuario={setUser}
                background={hijo.background} width={hijo.width}
                />
            })}
        </div>
    )
}


ReactDOM.render(<div>
    <Padre id={"asdf123"}/>
</div>,
    document.getElementById("root")
)