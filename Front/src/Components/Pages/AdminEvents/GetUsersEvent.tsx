import Button from "../../Utils/Button";

export default function GetUsersEvent() {
    return (
        <>
            <div>Get User</div >
            <Button type="button" classes="empty-button" method={() => console.log("Get Users Event")} text="Test" />
        </>
    )
}