import './constructors.css'

const ConstructorCard = ({data}) => {
return(
    <div >
        <table>
            <th>SNo</th>
            <th>Name</th>
            <th>Points</th>
        {data.map((constructors, index) => (
            <tr><td>{index+1}</td><td>{constructors.constructor_name}</td><td>{constructors.total_points}</td></tr>
        ))}
      </table>
    </div>
);
}

export default ConstructorCard;