import { useState, useEffect, useRef } from "react";
import DeleteDialogue from "./deleteDialogue.component"
import Button from '@material-ui/core/Button';

//the user component, also functions as the user information page
//props for later { user, onDelete, editUser }
const Manager = ({ manager, onDelete, logOut, getHotel, props, onUpdate }) => {
    const [hidden, setHidden] = useState(true);
    const [warning, setWarning] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [hotelName, setHotelName] = useState("");
    const [hotelLocation, setHotelLocation] = useState({
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        stateOrProvince: "",
        country: "",
        postalCode: "",
    });
    const [safty, setSafty] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [managerSave, setManagerSave] = useState(false);

    useEffect(() => {
        if (hotelName == "" && hotelLocation.streetAddress1 == "") {
            getHotel(manager.hotel_ID, setHotelLocation, setHotelName, hotelLocation)


        }
        //only fillforms if the user exists
        if (username == "" && password == "") {
            fillForms();
        }
    },[])
    //this happpens at the start of the apps life cycle
    useEffect(() => {
        
        //this is a reference to the button
        //basically, we add an event listener after its loaded up
        //the reason we do this instead of directly in-line
        //is beacuse I either could not prevent default
        //or I would cause a render infinit loop
        //this solves all those problems
        refToLogout.current.addEventListener("click", function (e) {
            e.preventDefault();
            const logOutUser = () => {
                props.history.push('/');
                logOut();
            }
            logOutUser();
        });

        //sends data back up to app then to backend
        const saveChanges = () => {
            onUpdate(manager, username, password, email, hotelName, hotelLocation, setWarning);
        }

        //if the user clicked save
        if (managerSave == true) {
            setManagerSave(false);
            saveChanges();
        }
        //constantly check whether they can save
        const checkStates = () => {
            if (warning.length == 0) {
                setCanSave(false)
                return;
            }
            if (username.length <= 3) {
                setCanSave(false)
                return;
            }
            if (password.length <= 5) {
                setCanSave(false)
                return;
            }
            if (!email) {
                setCanSave(false)
                return;
            }
            if (!hotelName) {
                setCanSave(false)
                return;
            }
            if (!hotelLocation) {
                setCanSave(false)
                return;
            }
            setCanSave(true);
        }
        checkStates();
        
        
    });

    if (manager._id == "") {
        props.history.push("/");
    }

    //fills out the form based on current user
    const fillForms = () => {
        console.log(manager);
        setUsername(manager.username);
        setPassword(manager.password);
        setEmail(manager.email);
    }

    const refToLogout = useRef(null);
    //toggles whether to show password
    const toggleHidden = (e) => {
        e.preventDefault();

        setHidden(!hidden);
    };

    const sendAlertOrUser = (e) => {
        e.preventDefault();
        if (canSave == false) {
            alert("cannot save due to invalid fields")
            console.log(email);
        }
        else {
            setManagerSave(true)
        }
    }



    //TODO: check if they changed username
    //check if new username isn't already in use
    //if not, update data
    //else, tell user

   

    const deleteAccount = () => {
        onDelete(manager._id);
        props.history.push('/');

    }


    return (

        <div className='manager'>
            <div className={"margin-50"}>
                <header className={"bold-center"}>Manager Account Information </header>
            </div>
            <form className={"user-information"}>
                {/* we wrap this function call in a lambda to prevent render infi loop*/}
                <header className={"main-header"}> <Button id={"logOutButton"} ref={refToLogout} > log out</Button></header>

                <div>
                    <label>Username:</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => { setWarning("changes made "); setUsername(e.target.value); }
                        } />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type={hidden ? 'password' : 'text'}
                        value={password}
                        onChange={(e) => { setWarning("changes made "); setPassword(e.target.value); }
                        } />
                    <Button onClick={toggleHidden}> Show Password</Button>
                </div>
                <div>
                    <label>Hotel Name:</label>
                    <input
                        type='text'
                        value={hotelName}
                        onChange={(e) => { setWarning("changes made "); setHotelName(e.target.value); }
                        } />
                    
                </div>
                <div>
                    <label>Hotel Street Address 1:</label>
                    <input
                        type='text'
                        value={hotelLocation.streetAddress1}
                        onChange={(e) => { setWarning("changes made "); setHotelLocation({ ...hotelLocation,streetAddress1: e.target.value }); }
                        } />
                </div>
                <div>
                    <label>Hotel Street Address 2:</label>
                    <input
                        type='text'
                        value={hotelLocation.streetAddress2}
                        onChange={(e) => { setWarning("changes made "); setHotelLocation({ ...hotelLocation, streetAddress2: e.target.value }); }
                        } />
                </div>
                <div>
                    <label>Hotel City:</label>
                    <input
                        type='text'
                        value={hotelLocation.city}
                        onChange={(e) => { setWarning("changes made "); setHotelLocation({ ...hotelLocation, city: e.target.value }); }
                        } />
                </div>
                <div>
                    <label>Hotel State/Province:</label>
                    <input
                        type='text'
                        value={hotelLocation.stateOrProvince}
                        onChange={(e) => { setWarning("changes made "); setHotelLocation({...hotelLocation, stateOrProvince: e.target.value }); }
                        } />
                </div>
                <div>
                    <label>Hotel Country:</label>
                    <input
                        type='text'
                        value={hotelLocation.country}
                        onChange={(e) => { setWarning("changes made "); setHotelLocation({ ...hotelLocation, country: e.target.value }); }
                        } />
                </div>
                <div>
                    <label>Hotel Postal Code:</label>
                    <input
                        type='text'
                        value={hotelLocation.postalCode}
                        onChange={(e) => { setWarning("changes made "); setHotelLocation({ ...hotelLocation,postalCode: e.target.value }); }
                        } />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => { setWarning("changes made "); setEmail(e.target.value); }
                        } />

                </div>
                <div className={"bottom-right-corner"}>
                    <i>{warning}</i>
                    <Button onClick={sendAlertOrUser}> Save Changes</Button>
                    <Button onClick={() => window.location.reload()}> Cancel</Button>

                </div>
                <br></br>
                <DeleteDialogue
                    title="Delete Account?"
                    open={safty}
                    setOpen={setSafty}
                    onConfirm={deleteAccount}
                > Are you sure you want to delete your account? this is Permanent!</DeleteDialogue>
                <Button
                    variant="contained"
                    color="secondary"

                    onClick={() => setSafty(true)}
                > Permanently delete your account </Button>
            </form>




        </div>

    )


}

export default Manager