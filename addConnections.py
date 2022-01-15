import chromedriver_binary
import time
import logging
import sys
import os 
import re
from dataclasses import dataclass
from typing import Dict, Set
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.action_chains import ActionChains
import chromedriver_binary
import winsound
logger=logging.getLogger("bot")
def set_chrome_options(headless:bool=False) -> None:
    """Sets chrome options for Selenium.
    Chrome options for headless browser is enabled.
    """
    chrome_options = Options()
    if headless is True:
        chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_prefs = {}
    chrome_options.experimental_options["prefs"] = chrome_prefs
    chrome_prefs["profile.default_content_settings"] = {"images": 2}
    return chrome_options# testing credentials (blame asher)

@dataclass
class User:
    name: str
    email: str
    password: str

# credentials = [
#     User("ariel", "shatz.ariel@gmail.com", "ASAS1919"),
#     User("asher", "ARADENSKY@GMAIL.COM", "Deep-tech"),
#     User("yuval", "yuval@deeptechshowcase.com", "Deep2021"),
#     User("josh", "josh@eaglepointfunding.com", "Jb2022Jb"),
#     User("liora", "lioramore123@gmail.com", "LiLeeDTS8"),
#     User("liora c", "liora@eaglepointfunding.com", "Liora145"),
#     User("shlomie", "shlomieisenmann@gmail.com", "4166reSe!"),
#     User("danielle", "daniellajakubowitz@gmail.com", "Purple!yay"),
#     User("sasha", "sblecher810@gmail.com ", "ISLAmujeres21"),
#     User("katie", "katie@eaglepointfunding.com", "4meonly2"),
#     User("max", "mhfrischman@gmail.com", "Mf2020Mf"),
#     User("yoav", "yoav.e.sadan@gmail.com", "NOWITSLENASFAULT123"),
#     User("bibi", "binyamin.samson@gmail.com", "R3dElephantsSaveSouls*"),
#     User("sarah", "sarahbatya123@gmail.com", "Houston909"),
#     User("ari", "ari@eaglepointfunding.com", "IloveOr5!"),
#     User("matthew", "Matthew.david.cloud@gmail.com", "Eaglepoint1"),
#     User("Bryan", "bryanmarkowitz@gmail.com", "MeGustanFajitas21"),
#     User("Sharon", "Sharon.ehieli@gmail.com", "chompi86!")
# ]
print("Welcome to the FriendMacherTM. Please use a larger monitor for this program to work properly. By using this bot you are prohibited from calling it Messi or Messy or any variation as such. Non cooperation of this agreement will lead to license restriction of said bot. Thank you. Have a wonderful time.")
beep = int(input("how many people do you want clicked?"))
nummy = int(input("Where should I start clicking from? (This is for people who have personal contacts on this list)"))


def get_email_and_password():
    # messages = [f"Enter for {credentials[0].name}"]
    # messages += [f"{str(i+1)} for {user.name}" for i, user in enumerate(credentials[1:])]
    # prompt = ", ".join(messages)

    # print(f"Please enter {prompt}")
    print("or 'new' if you're not on the list")
    # inp = input(": ")
    # try:
    #     user_id = 0 if inp == "" else int(inp)
    #     user = credentials[user_id]
    #     return user.email, user.password
    # except (ValueError, IndexError):
    #     email = input("LinkedIn email: ")
    #     password = input("LinkedIn password: ")
    #     return email, password

def setup(driver, fullscreen=False):
    # go to linkedin
    driver.get("https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin")
    if fullscreen is True:
        driver.maximize_window()
    else:
        driver.set_window_size(1920, 1080)

    # waits for some time
    driver.implicitly_wait(40)
    return driver

def login(driver, email, password):
    # enter phone/email
    email_element = driver.find_element_by_xpath("//*[@id='username']")
    email_element.send_keys(email)

    # enter password
    password_element = driver.find_element_by_xpath("//*[@id='password']")
    password_element.send_keys(password)
    time.sleep(1)

    # Submits credentials
    driver.find_element_by_xpath("//*[@id='organic-div']/form/div[3]/button").click()

    time.sleep(2)
    driver.implicitly_wait(5)
def get_user_filter():
    inp = "https://www.linkedin.com/mynetwork/import-contacts/results/member/"
    try:
        filter_id = 0 if inp == "" else int(inp)
        return user_filters[filter_id]
    except (ValueError, IndexError):
        return inp
def apply_filter(driver, user_filter):
    # goes to search page and applies filter
    driver.get(user_filter)

def prompt_user():
    email, password = get_email_and_password()
    user_filter = get_user_filter()
    return email, password, user_filter

def initialize_linkedin():
    email, password, user_filter = prompt_user()

    driver = webdriver.Chrome(options=set_chrome_options())
    setup(driver, fullscreen=True)
    login(driver, email=email, password=password)
    logger.info("logged in")
    apply_filter(driver, user_filter=user_filter)
    return driver, user_filter
def scrollDown(self):
    body = self.browser.find_element_by_xpath('/html/body')
    body.click()
    ActionChains(self.browser).send_keys(Keys.PAGE_DOWN).perform()

def main():
    driver, user_filter = initialize_linkedin()
    time.sleep(4)
    for x in range(int((nummy/10)+10)):
        time.sleep(2)
        body = driver.find_element_by_css_selector('body')
        body.click()
        body.send_keys(Keys.PAGE_DOWN)
    for x in range(10):
    	#time.sleep()
            body = driver.find_element_by_css_selector('body')
            body.click()
            body.send_keys(Keys.HOME)
    print("hello")
    try:
        for i in range(beep):
        	#finds the check boxes to make new friends and clicks them
            driver.find_element_by_xpath("//*[@id='main']/div/div/div[2]/div/ul/li["+str(i+nummy)+"]/a/div/div[1]/label").click()
            time.sleep(1)
            if i==beep-1:
                #this piece of code makes noise
                duration =1000
                freq = 440 
                winsound.Beep(freq,duration)
                #submits the requests before the program quits 
                driver.find_element_by_xpath("//*[@id='ember2516']").click()
                driver.find_element_by_xpath("//*[@id='ember2516']").click()
                driver.find_element_by_xpath("//*[@id='ember2516']").click()                
                time.sleep(30)
    except Exception as exc:
        logger.exception("failed", exc_info=exc)
        driver.get_screenshot_as_file("logs/crash.png")
        driver.close()
    logger.info("Done")  



if __name__ == "__main__":
    main()