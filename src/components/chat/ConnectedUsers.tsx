import { Button } from "react-bootstrap"

export const ConnectedUsers: React.FC<{users: string[]}> = ({users}) => {
    return (<>
        <div className="user-list">
            <h4>Users in room:</h4>
            
            {users.map((user, index) => <h6 key={index}>{user}</h6>)}
        </div>
            </>
    )
}