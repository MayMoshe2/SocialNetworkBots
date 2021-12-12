import pyautogui
# import webbrowser
import UserPage
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
import chromedriver_binary

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
    return chrome_options





# helper function


@dataclass
class User:
    name: str
    email: str
    password: str


# testing credentials (blame asher)
credentials = [
    User("ariel", "shatz.ariel@gmail.com", "ASAS1919"),
    User("asher", "ARADENSKY@GMAIL.COM", "Deep-tech"),
    User("yuval", "yuval@deeptechshowcase.com", "Deep2021"),
    User("josh", "josh@eaglepointfunding.com", "Jb2022Jb"),
    User("liora", "lioramore123@gmail.com", "LiLeeDTS8"),
    User("liora c", "liora@eaglepointfunding.com", "Liora145"),
    User("shlomie", "shlomieisenmann@gmail.com", "4166reSe!"),
    User("danielle", "daniellajakubowitz@gmail.com", "Purple!yay"),
    User("sasha", "sblecher810@gmail.com ", "ISLAmujeres21"),
    User("katie", "katie@eaglepointfunding.com", "4meonly2"),
    User("max", "mhfrischman@gmail.com", "Mf2020Mf"),
    User("yoav", "yoav.e.sadan@gmail.com", "NOWITSLENASFAULT123"),
    User("bibi", "binyamin.samson@gmail.com", "R3dElephantsSaveSouls*"),
    User("sarah", "sarahbatya123@gmail.com", "Houston909"),
    User("ari", "ari@eaglepointfunding.com", "IloveOr5!"),
    User("matthew", "Matthew.david.cloud@gmail.com", "Eaglepoint1"),
    User("Bryan", "bryanmarkowitz@gmail.com", "MeGustanFajitas21"),
    User("Lena", "Lenaawadp3@gmail.com", "EPF@2580"),
    User("Ariel K", "tsarfatiariel@gmail.com", "Eagle2021"),
    User("Sharon", "Sharon.ehieli@gmail.com", "chompi86!")

]

def initialize_logger():
    logger.setLevel(logging.DEBUG)

    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s", datefmt="%Y-%m-%d %H:%M:%S")
    handlers = [logging.StreamHandler(sys.stdout), logging.FileHandler(filename=f"logs/output.log")]
    for handler in handlers:
        handler.setLevel(logging.DEBUG)
        handler.setFormatter(formatter)
        logger.addHandler(handler)

def apply_filter(driver, user_filter):
    # goes to search page and applies filter
    driver.get(user_filter)

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

# message
messages = [
    "Hi <first_name>, I am reaching out to invite you to our next showcase focused on Aerospace and Defense taking place on October 28th. You can register for the event here: https://www.linkedin.com/events/deep-techshowcase-aerospace-def6805797022231207936/ . Looking forward to seeing you there!",
    "test",
]


def get_message():
    inp = input("Enter message or press enter for default: ")
    try:
        message_id = 0 if inp == "" else int(inp)
        return messages[message_id]
    except (ValueError, IndexError):
        return inp


def get_num_pages():
    limitp = input("How many pages should I do? ")
    return int(limitp)


def get_setup_confirmation():
    input(
        "Please don't forget to turn off new message popups in messaging setting and changing send to enter. Press enter to continue."
    )

def get_user_filter():
    inp = input(
        "Please paste the link of your specified filter from linkedin (press enter for first connections that are ceos of tech companies. Enter 1 to test eagle point employees)"
    )
    try:
        filter_id = 0 if inp == "" else int(inp)
        return user_filters[filter_id]
    except (ValueError, IndexError):
        return inp

def prompt_user():
    get_setup_confirmation()
    email, password = get_email_and_password()
    user_filter = get_user_filter()
    message = get_message()
    num_pages = get_num_pages()
    return email, password, user_filter, message, num_pages

def initialize_linkedin():
    email, password, user_filter, message, num_pages = prompt_user()

    driver = webdriver.Chrome(options=set_chrome_options())
    setup(driver, fullscreen=True)
    login(driver, email=email, password=password)
    logger.info("logged in")
    apply_filter(driver, user_filter=user_filter)
    return driver, user_filter, message, num_pages

def get_email_and_password():
    messages = [f"Enter for {credentials[0].name}"]
    messages += [f"{str(i+1)} for {user.name}" for i, user in enumerate(credentials[1:])]
    prompt = ", ".join(messages)

    print(f"Please enter {prompt}")
    print("or 'new' if you're not on the list")
    inp = input(": ")
    try:
        user_id = 0 if inp == "" else int(inp)
        user = credentials[user_id]
        return user.email, user.password
    except (ValueError, IndexError):
        email = input("LinkedIn email: ")
        password = input("LinkedIn password: ")
        return email, password


user_filters = [
    "https://www.linkedin.com/search/results/people/?industry=%5B%22135%22%2C%224%22%2C%2296%22%5D&network=%5B%22F%22%5D&origin=FACETED_SEARCH&page=1&title=CEO",
    "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2227159493%22%5D&network=%5B%22F%22%5D&origin=FACETED_SEARCH",
]

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


# url = 'https://www.linkedin.com/'

# chrome_path = '"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" %s'
# bot = webbrowser.get(chrome_path).open(url)
# #webbchrome_path.rowser.maximize_window()

# time.sleep(10)
  
# Obtain button by link text and click.
#button = driver.find_element_by_xpath('//*[@id="msg-overlay-list-bubble-search__search-typeahead-input"]')
#button = webbrowser.find_element_by_link_text("mynetwork")
#button.click()

# button.click()



if __name__ == "__main__":
    os.makedirs("logs", exist_ok=True)
    delivery_tracker_filename = os.path.join("logs", "delivery_tracker.csv")
    initialize_logger()
    driver, user_filter, message, num_pages = initialize_linkedin()

    page = UserPage(driver, message, delivery_tracker_filename=delivery_tracker_filename, testing=False)

