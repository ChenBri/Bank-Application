import Button from "../../Utils/Button";

export default function MainEvent() {
    return (
        <>
            <div className="text-4xl font-bold mb-6">Welcome, Admin!</div>
            <div className="flex flex-col text-lg pt-8 leading-relaxed">
                <p>On this page, you have the ability to manage data efficiently. You can view, modify, create, and delete records as needed.</p>
                <p className="mt-4">Please select an operation from the left sidebar to get started.</p>
            </div>
        </>

    )
}