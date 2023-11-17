export const Token = () =>  {
	return {	
	  commonToken:(localStorage.getItem("_auth"))?localStorage.getItem("_auth"):"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ0LCJzZWNyZXQiOiIyMGRlYTdjMTNmNzBmMGJjMTE1MjkzZmY4MDgxNWQzNTQ2MzkzYTk4IiwiaWF0IjoxNTk2NzI1NDA1fQ.iEBuJ8s_RmnN_3ElBdZUURn-5FvOoCPopOyFCiJCNi8",
	  adminToken:localStorage.getItem("_admin_auth"),
	  frontendToken:localStorage.getItem("_auth")
	}
};
export const commonHeader = () => { 
    return {
        headers: { contentType: "application/json", Authorization:"Token "+Token().commonToken}
    }
}

export const adminHeader = () => { 
    return {
        headers: { contentType: "application/json", Authorization:"Token "+Token().adminToken}
    }
}

export const adminFileHeader = () => { 
    return {
        headers: { contentType: "multipart/form-data", Authorization:"Token "+Token().adminToken}
    }
}

export const frontendHeader = () => { 
    return {
        headers: { contentType: "application/json", Authorization:"Token "+Token().frontendToken}
    }
}

export const frontendFileHeader = () => { 
    return {
        headers: { contentType: "multipart/form-data", Authorization:"Token "+Token().commonToken}
    }
}

export const tokenPassHeader = (token:string) => { 
    return {
        headers: { contentType: "application/json", Authorization:(token)?"Token "+token:""}
    }
}


