import Button from "../../Utils/Button";

export default function GetUsersEvent() {
    return (
        <>
            <div>Get Users</div >
            <Button type="button" classes="empty-button" method={() => console.log("Get Users Event")} text="Test" />
        </>
    )
}