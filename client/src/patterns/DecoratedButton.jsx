export default function DecoratedButton({className, clickFunction, children }){
    const run = (e) =>{
        e.preventDefault();
        clickFunction();
    }

    return <button className={className} onClick={(e)=>run(e)} > {children} </button>   
}