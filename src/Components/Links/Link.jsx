import React, { useEffect, useState } from 'react';
import './link.css';
import uuid from 'react-uuid';

export const Link = ({disabled}) => {

    const [arrayLinks, setArrayLinks] = useState([]);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [editing, setEditing] = useState(null);
    const [updatingName, setUpdatingName] = useState("");
    const [updatingUrl, setUpdatingUrl] = useState("");
    const [dialogEdit, setDialogEdit] = useState(false);

    function openChromeTab() {
        chrome.tabs.update({url: 'chrome-search://local-ntp/local-ntp.html'});
    }

    const handleClick = () => {
        setShowDialog(true);
    };

    const handleDialogEdit = () => {
        setDialogEdit(true);
    };

    const handleDeleteLink = (link) => {
        setArrayLinks(arrayLinks.filter(l => l.id != link.id));
    };

    const handleEditLink = (editedLink) => {
        setEditing(editedLink);
        setUpdatingName(editedLink.name);
        setUpdatingUrl(editedLink.url);
    }

    const handleCreateLink = (event) => {
        event.preventDefault();
        const newLink = {
            id: uuid(),
            name: name,
            url: url
        }
        setArrayLinks([...arrayLinks, newLink]);
        
        setName("");
        setUrl("");
    };

    const handleUpdatingLink = (event) => {
        event.preventDefault();
        const updatedLink = arrayLinks.map(link => {
            if(link.id === editing.id){
                return {
                    ...link,
                    name: updatingName,
                    url: updatingUrl
                };
            };
            return link;
        });

        setArrayLinks(updatedLink);
        setEditing(null);
        setUpdatingName("");
        setUpdatingUrl("");
    }

    useEffect(() => {
        const allLinks = JSON.parse(localStorage.getItem("arrayLinks"));
        if(allLinks){
            setArrayLinks(allLinks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("arrayLinks", JSON.stringify(arrayLinks));
    }, [arrayLinks]);

    return (
        <div className="dropdown-center text-light text-start mt-5">
            {disabled && <> <button className="btn btn-transparent border border-0 bg-
                transparent text-light mt-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Links
            </button>
            {showDialog? (<form className='text-light mt-1' onSubmit={handleCreateLink} style={{height: 260, width: 250}} id='form'>
                <div className="mb-3 ms-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-4" style={{fontSize: 13}}>NAME</label>
                    <input type="text" id="exampleFormControlInput1" value={name} onChange={(e) => setName(e.target.value)} required />
                    <div className='invalid-feedback'>
                        Type a link
                    </div>
                </div>
                <div className="mb-3 ms-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label" style={{fontSize: 13}}>LINKS</label>
                    <input type="url" id="exampleFormControlInput2" placeholder='example.com' value={url} onChange={(e) => setUrl(e.target.value)} required />
                    <div className='invalid-feedback'>
                        Type a url
                    </div>
                </div>
                <button className='mt-2 ms-3' type="submit" id='buttonCreate'>Create</button>
            </form>) : (<ul className="dropdown-menu" style={{width: 250, height: 99}} id='ulMenu'>
                <li id='linkChrome'>
                    <a href="#" className="dropdown-item d-flex mt-2" target="_blank" onClick={openChromeTab} id='aChrome'>
                        <i className="bi bi-browser-chrome text-secondary"></i>
                        <p className='text-secondary ms-2' style={{fontSize: 16}} >Chrome Tab</p>
                    </a>
                </li>

                {/*  LISTA DE LINKS  */}
                
                    {arrayLinks.map(link => <li className='d-flex align-items-center' key={link.id}>
                        {editing === link? (<form className='text-light' onSubmit={handleUpdatingLink} style={{height: 260, width: 250}} id='formEdit'>
                        <div className="mb-3 ms-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-4" style={{fontSize: 13}}>NAME</label>
                            <input type="text" id="exampleFormControlInput1" value={updatingName} onChange={(e) => setUpdatingName(e.target.value)} autoFocus />
                        </div>
                        <div className="mb-3 ms-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label" style={{fontSize: 13}}>LINKS</label>
                            <input type="url" id="exampleFormControlInput2" placeholder='example.com' value={updatingUrl} onChange={(e) => setUpdatingUrl(e.target.value)} autoFocus />
                        </div>
                        <button className='mt-2 ms-3' type="submit" id='buttonSave'>Save</button>
                    </form>) : (<>  <a href={link.url} target='_blank' className="dropdown-item d-flex align-items-between" key={link.id} id='linksArray'>
                            <i className="bi bi-box-arrow-up-right" id='iconUrl'></i>
                            <p className='text-secondary ms-2 mt-2'>{link.name}</p>
                        </a>
                        <div className='d-flex'>
                            <button type='submit' className='text-light' onClick={() => handleDeleteLink(link)} id='buttonDelete'>X</button>
                            <button className='text-light' id='buttonEdit' onClick={() => handleEditLink(link)}>
                                <i className="bi bi-pencil-square" onClick={handleDialogEdit}></i>
                            </button>
                        </div> </>)}
                    </li>
                    )}
                
                <li>
                    <a className="dropdown-item d-flex" id='liLink'>
                        <i className="bi bi-plus-lg text-secondary" id='iconLink'></i>
                        <p className='text-secondary ms-2' onClick={handleClick} style={{cursor: 'pointer'}} id='linkP'>New Link</p>
                    </a>
                </li>
            </ul> )}
            </>}
        </div>
    )
}