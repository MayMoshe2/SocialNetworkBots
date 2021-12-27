import pyautogui
# import webbrowser
# import UserPage
# import DeliveryTracker
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
    Id: int


# testing credentials (blame asher)
credentials = [
    User("ariel", "shatz.ariel@gmail.com", "ASAS1919",0),
    User("asher", "ARADENSKY@GMAIL.COM", "Deep-tech",1),
    User("yuval", "yuval@deeptechshowcase.com", "Deep2021",2),
    User("josh", "josh@eaglepointfunding.com", "Jb2022Jb",3),
    User("liora", "lioramore123@gmail.com", "LiLeeDTS8",4),
    User("liora c", "liora@eaglepointfunding.com", "Liora145",5),
    User("shlomie", "shlomieisenmann@gmail.com", "4166reSe!",6),
    User("danielle", "daniellajakubowitz@gmail.com", "Purple!yay",7),
    User("sasha", "sblecher810@gmail.com ", "ISLAmujeres21",8),
    User("katie", "katie@eaglepointfunding.com", "4meonly2",9),
    User("max", "mhfrischman@gmail.com", "Mf2020Mf",10),
    User("yoav", "yoav.e.sadan@gmail.com", "NOWITSLENASFAULT123",11),
    User("bibi", "binyamin.samson@gmail.com", "R3dElephantsSaveSouls*",12),
    User("sarah", "sarahbatya123@gmail.com", "Houston909",13),
    User("ari", "ari@eaglepointfunding.com", "IloveOr5!",14),
    User("matthew", "Matthew.david.cloud@gmail.com", "Eaglepoint1",15),
    User("Bryan", "bryanmarkowitz@gmail.com", "MeGustanFajitas21",16),
    User("Lena", "Lenaawadp3@gmail.com", "EPF@2580",17),
    User("Ariel K", "tsarfatiariel@gmail.com", "Eagle2021",18),
    User("Sharon", "Sharon.ehieli@gmail.com", "chompi86!",19)

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
    "Hi <first_name>, I am reaching out to invite you to our next showcase focused on Federal Funding Opportunities for Silicon Valley Start-Ups taking place on Decemcer 15th. You can register for the event here: https://www.linkedin.com/events/6859061435058708481/ . Looking forward to seeing you there!",
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

def get_current_page_number(user_filter):
    regex_match = re.match(".*page=([0-9]+).*", user_filter)
    regex_page_number_group = regex_match.groups()[0]
    current_page = int(regex_page_number_group)
    return current_page

def get_next_page_url(user_filter):
    if "page" not in user_filter:
        user_filter = f"{user_filter}&page=1"
    current_page_number = get_current_page_number(user_filter)
    url_split = user_filter.split('&')
    page_index = url_split.index(f'page={current_page_number}')
    url_split[page_index] = f'page={current_page_number+1}'
    return '&'.join(url_split)

def prompt_user():
    # get_setup_confirmation()
    # GUI.get_email_and_password2()
    # print (GUI.myglobalemail)
    email = GUI.myglobalemail
    password = GUI.myglobalpassword
    print(email, password)
    # email, password = get_email_and_password()
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

class UserPage:
    MESSAGE_FORMATTINGS = ["first_name"]
    def __init__(self, driver, message, delivery_tracker_filename, testing: bool = False):
        self.driver = driver
        self.message = message
        self.testing = testing
        self.delivery_tracker = DeliveryTracker(delivery_tracker_filename)

    def get_formatted_message(self, replace_strings: Dict[str, str]):
        message = self.message
        log = ", ".join([f"'<{k}>' = '{v}'" for k, v in replace_strings.items()])
        logger.info(f"Using the following replace strings: {log}")
        for replace_string in self.MESSAGE_FORMATTINGS:
            if replace_string in replace_strings:
                value_to_insert = replace_strings[replace_string]
                message = message.replace(f"<{replace_string}>", value_to_insert)
        return message

    def send_message_to_user(self, userNum,user_element, **message_formatting):
        message_button = self.get_message_button(userNum, user_element)
        message_button.click()
        message = self.get_formatted_message(replace_strings=message_formatting)
        self.send_message(message)
        time.sleep(0.5)
        self.click_x()
        if self.testing is True:
            self.discard_message()

    def send_message_to_users(self, user_elements):
        userNum = 1
        for user_element in user_elements:
            full_name = self.get_full_name(user_element)
            if not self.delivery_tracker.already_delivered(full_name):
                logger.info(f"Sending to {full_name}")
                first_name = full_name.split(" ")[0]
                self.send_message_to_user(userNum, user_element, first_name=first_name)
                self.delivery_tracker.add_user_to_delivered_list(full_name)
            else:
                logger.info(f"Already delivered to {full_name}")
            userNum+= 1

    def send_message(self, message):
        msgwin = self.driver.find_element_by_css_selector(".msg-form__contenteditable")
        msgwin.send_keys(message)
        if self.testing is False:
            msgwin.send_keys(Keys.ENTER)

    def discard_message(self):
        self.driver.find_element_by_xpath("//span[contains(.,'Discard')]").click()

    def get_user_elements(self):
        try:
            element_list_container = self.driver.find_element_by_css_selector(
                "#main > div > div > div.ph0.pv2.artdeco-card.mb2 > ul"
            )
            user_list = element_list_container.find_elements_by_css_selector("li")
            return user_list
        except Exception as exc:
            logger.exception("failed to find buttons", exc_info=exc)

    def get_full_name(self, user_element):
        name_info = user_element.find_element_by_partial_link_text("View").text
        name_info_parts = name_info.split("\n")
        if len(name_info_parts) < 2:
            logger.error(f"Seems like we have a problem with '{name_info}")
        full_name = name_info_parts[0]
        full_name= full_name.encode()
        full_name = str(full_name)[2:-1]
        logger.info(f"Found user's name: '{full_name}'")
        return full_name

    def get_message_button(self,userNum, user_element):
        xpathB = "//div/div/div[3]/ul/li[tempi]/div/div/div[3]/button"
        number = str(userNum)
        print("number", number)
        xpathB = xpathB.replace("tempi", number)
        print("xpathB:", xpathB) 
        return user_element.find_element_by_xpath(xpathB)

    def click_x(self):
        logger.info("click_x")
        try:
            self.driver.find_element_by_xpath("//div[2]/header/section[2]/button[3]").click()  # ash
        except Exception as exc:
            pass
        try:
            self.driver.find_element_by_xpath("/html/body/div[6]/aside/div[2]/header/section[2]/button[2]").click()
        except Exception as exc:
            pass
        try:
            self.driver.find_element_by_xpath("/html/body/div[6]/aside/div[3]/header/section[2]/button[3]").click()
        except Exception as exc:
            pass
        try:
            self.driver.find_element_by_xpath(".//span[contains(.,'Close your conversation')]").click()
        except Exception as exc:
            pass

class DeliveryTracker:
    def __init__(self, filename):
        self.filename = filename
        self.already_sent = set()
        self.update_delivered_users()

    def update_delivered_users(self):
        with open(self.filename) as f:
            user_full_names = [user_full_name.strip() for user_full_name in f]
        self.already_sent.update(user_full_names)

    def get_delivered_users(self) -> Set:
        return self.already_sent

    def add_user_to_delivered_list(self, full_name: str):
        if full_name not in self.already_sent:
            self.already_sent.add(full_name)
            with open(self.filename, "a") as f:
                f.write(f"{full_name}\n")

    def already_delivered(self, full_name) -> bool:
        return full_name in self.already_sent



if __name__ == "__main__":
    # GUI
    # print (GUI.myglobalemail)
    # print (GUI.myglobalpassword)
    os.makedirs("logs", exist_ok=True)
    delivery_tracker_filename = os.path.join("logs", "delivery_tracker.csv")
    print("delivery_tracker_filename: delivery_tracker_filename:",delivery_tracker_filename)
    initialize_logger()
    driver, user_filter, message, num_pages = initialize_linkedin()

    page = UserPage(driver, message, delivery_tracker_filename, testing=False)

    try:
        for i in range(num_pages):
            page_number = i + 1
            logger.info(f"Processing page {page_number}")
            user_elements = page.get_user_elements()
            logger.info(f"Found {len(user_elements)} users on this page")
            if len(user_elements) == 0:
                logger.info(f"No more users on this page. My work here is done")
                break
            page.send_message_to_users(user_elements)
            logger.info("Attempting to go to next page")
            user_filter = get_next_page_url(user_filter)
            apply_filter(driver, user_filter=user_filter)
            time.sleep(1)
    except Exception as exc:
        logger.exception("failed", exc_info=exc)
        driver.get_screenshot_as_file("logs/crash.png")
        driver.close()
    logger.info("Done")