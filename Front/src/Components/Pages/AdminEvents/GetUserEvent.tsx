import Button from "../../Utils/Button";

export default function GetUserEvent() {
    return (
        <>
            <div>Get User</div >
            <Button type="button" classes="empty-button" method={() => console.log("Get User Event")} text="Refresh" />
        </>
    )
}