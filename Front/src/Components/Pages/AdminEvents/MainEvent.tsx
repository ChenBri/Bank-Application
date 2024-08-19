import Button from "../../Utils/Button";

export default function MainEvent() {
    return (
        <>
            <div>Main</div >
            <Button type="button" classes="empty-button" method={() => console.log("Main Event")} text="Test" />
        </>
    )
}