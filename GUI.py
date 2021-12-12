# import tkMessageBox
from os import name
from time import time
import temp
from tkinter import *
import tkinter.messagebox
from dataclasses import dataclass
import chromedriver_binary

global myglobalpassword
myglobalpassword = "0"   
global myglobalemail
myglobalemail = "0" 


root = Tk()
root.geometry("900x300")

def fram2():
    myLabal1.destroy()
    myLabal2.destroy()
    B.destroy()

    value_inside = tkinter.StringVar(root)
    value_inside.set("Select your user")
    usersArray = []
    for user in temp.credentials:
        usersArray.append(user.name)
    question_menu = tkinter.OptionMenu(root, value_inside, *usersArray, command=get_email_and_password2)  
    # question_menu.configure(width = 80, justify='center', padx=60, bg = "white")
    question_menu.configure(width=90, font=('Helvetica', 12), background = "azure",  activebackground="white")
    # question_menu.grid(row=0, column=0, padx=10)
    print ("somthing yoidy: ", question_menu)
    question_menu.pack()
    # root.destroy()
    
def get_email_and_password2(choice):
    temp1 = 0
    for user in temp.credentials:
        if choice == user.name:
            temp1 = user.Id
    user = temp.credentials[temp1]
    myglobalpassword = user.password
    myglobalemail = user.email
    print(myglobalpassword,myglobalemail)
    # print(choice)

    # print (temp1, user.email, user.name)
    # return user.email, user.password
    # except (ValueError, IndexError):
    #     email = input("LinkedIn email: ")
    #     password = input("LinkedIn password: ")
    #     return email, password
    
    # choice = variable.get()




myLabal1 = Label(root, width = 80, height=4,font=("Helvetica", 14),  text="Hay, This is Liora Cubed I will help you with Marketing Now ")
myLabal2 = Label(root, width = 80, height=4,font=("Helvetica", 12),  text="Please don't forget to turn off new message popups in messaging setting and changing send to enter.")
# myLabal3 = Label(root, width = 80, height=4,font=("Helvetica", 10),  text="Press Next to continue")
 


B = Button(root, text ="Next", height=2,width =10,font=("Helvetica", 10), command = fram2)


myLabal1.grid(row=0, column=0)
myLabal2.grid(row=1, column=0)
# myLabal3.grid(row=2, column=0)
B.grid(row = 3, column = 0)



root.mainloop()



# print ("nir maman")
# window = tk.Tk()
# print ("nir maman")

# window.title("my name is nir")
# greeting = tk.Label(text="Hello, Tkinter")
# greeting.pack()