import bcrypt from 'bcrypt';

//hash the password
export const hashPassword = (password)=>{
    return new Promise((resolve,reject) => {
        //generate saltRound
        bcrypt.genSalt(12,(err,salt)=>{
            if (err){
                reject(err);
            }
            //generate the hashedpassword
            bcrypt.hash(password,salt,(err,hash)=>{
                if (err){
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}
//compare password 
export const comparePassword =(password,hashed)=>{
    return bcrypt.compare(password,hashed)
}
export const welcomeMessage =  (req, res) => {
    return res.json({
      status: "success",
      message: "Welcome to momo server",
      baseUrl: "https://equal-mirella-myproject147-b2fbda9b.koyeb.app/api",
      endpoints: [
        {
          method: "POST",
          path: "/auth/register",
          protected: false,
          description: "Register a new user",
          requestBody: {
            firstName: "string",
            lastName: "string",
            email: "string",
            password: "string",
            phone: "string"
          },
          response: {
            status: "success",
            message: "Registration successful",
            data: {
              accessToken: "string",
              user: {
                userId: "string",
                firstName: "string",
                lastName: "string",
                email: "string",
                phone: "string"
              }
            }
          }
        },
        {
          method: "POST",
          path: "/auth/login",
          protected: false,
          description: "Log in a user",
          requestBody: {
            email: "string",
            password: "string"
          },
          response: {
            status: "success",
            message: "Login successful",
            data: {
              accessToken: "string",
              user: {
                userId: "string",
                firstName: "string",
                lastName: "string",
                email: "string",
                phone: "string"
              }
            }
          }
        },
        {
          method: "GET",
          path: "/users",
          protected: true,
          description: "Get all users",
          response: {
            status: "success",
            message: "Users retrieved successfully",
            data: [
              {
                userId: "string",
                firstName: "string",
                lastName: "string",
                email: "string",
                phone: "string"
              }
            ]
          }
        },
        {
          method: "GET",
          path: "/users/:userId",
          protected: true,
          description: "Get user by ID",
          response: {
            status: "success",
            message: "User retrieved successfully",
            data: {
              userId: "string",
              firstName: "string",
              lastName: "string",
              email: "string",
              phone: "string"
            }
          }
        },
        {
          method: "POST",
          path: "/organisations",
          protected: true,
          description: "Create a new organisation",
          requestBody: {
            name: "string",
            description: "string"
          },
          response: {
            status: "success",
            message: "Organisation created successfully",
            data: {
              orgId: "string",
              name: "string",
              description: "string"
            }
          }
        },
        {
          method: "GET",
          path: "/organisations",
          protected: true,
          description: "Get all organisations the user belongs to or created",
          protected: true,
          response: {
            status: "success",
            message: "Organisations retrieved successfully",
            data: {
              organisations: [
                {
                  orgId: "string",
                  name: "string",
                  description: "string"
                }
              ]
            }
          }
        },
        {
          method: "GET",
          path: "/organisations/:orgId",
          protected: true,
          description: "Get a single organisation by ID",
          response: {
            status: "success",
            message: "Organisation retrieved successfully",
            data: {
              orgId: "string",
              name: "string",
              description: "string"
            }
          }
        },
        {
          method: "POST",
          path: "/organisations/:orgId/users",
          protected: true,
          description: "Add a user to an organisation",
          requestBody: {
            userId: "string"
          },
          response: {
            status: "success",
            message: "User added to organisation successfully"
          }
        }
      ]
    })
  }