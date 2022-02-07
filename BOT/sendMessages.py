from cmath import log
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
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


# initializations
# cred = credentials.Certificate("socialnetworksbots-firebase-adminsdk-ckg7j-0ed2aef80b.json")
# firebase_admin.initialize_app(cred)
# db = firestore.client()

# def nir():
#     emp_ref = db.collection('users')
#     docs = emp_ref.stream()
#     for doc in docs:
#        #print('{} => {} ',doc.id,  doc.to_dict())
#        print('{} => {} ',doc.id, doc.get('name'))


logger = logging.getLogger("bot")


def set_chrome_options(headless: bool = False) -> None:
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


def initialize_logger():
    logger.setLevel(logging.DEBUG)

    formatter = logging.Formatter(
        "%(asctime)s - %(levelname)s - %(message)s", datefmt="%Y-%m-%d %H:%M:%S")
    handlers = [logging.StreamHandler(
        sys.stdout), logging.FileHandler(filename=f"logs/output.log")]
    for handler in handlers:
        handler.setLevel(logging.DEBUG)
        handler.setFormatter(formatter)
        logger.addHandler(handler)


def apply_filter(driver, user_filter):
    # goes to search page and applies filter
    driver.get(user_filter)


def setup(driver, fullscreen=False):
    # go to linkedin
    driver.get(
        "https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin")
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
    email = 1
    password = 2
    cred = credentials.Certificate(
        "socialnetworksbots-firebase-adminsdk-ckg7j-0ed2aef80b.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    f = open("data/detailsFromUser.json")
    data = json.load(f)
    id_user = int(data["0"]["user"])
    logger.info(id_user)

    emp_ref = db.collection('users')
    docs = emp_ref.stream()

    logger.info("start prompt5 ")
    for doc in docs:
        value = int(doc.get('value'))
        if value == id_user:
            email = doc.get('username')
            password = doc.get('password')
        else:
            logger.info("No success")

    option = data["0"]["box"]
    if option == 1:
        user_filter = data["0"]["filterLink"]
    else:
        user_filter = user_filters[0]
    user_filter = data["0"]["filterLink"]
    message = data["0"]["message"]
    num_pages = data["0"]["pages"]

    logger.info("userfilter: ", user_filter)

    return email, password, user_filter, message, num_pages


def initialize_linkedin():
    email, password, user_filter, message, num_pages = prompt_user()
    try:
        driver = webdriver.Chrome(options=set_chrome_options())
        setup(driver, fullscreen=True)
        login(driver, email=email, password=password)
        apply_filter(driver, user_filter=user_filter)
        print(user_filter)
    except Exception as exc:
        logger.info("initialize_linkedin2")
        print(exc)
    logger.info(f"logged in")
    return driver, user_filter, message, num_pages

user_filters = [
    # "https://www.linkedin.com/search/results/people/?industry=%5B%22135%22%2C%224%22%2C%2296%22%5D&network=%5B%22F%22%5D&origin=FACETED_SEARCH&page=1&title=CEO",
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
    driver.find_element_by_xpath(
        "//*[@id='organic-div']/form/div[3]/button").click()

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
        log = ", ".join([f"'<{k}>' = '{v}'" for k,
                         v in replace_strings.items()])
        logger.info(f"Using the following replace strings: {log}")
        for replace_string in self.MESSAGE_FORMATTINGS:
            if replace_string in replace_strings:
                value_to_insert = replace_strings[replace_string]
                message = message.replace(
                    f"<{replace_string}>", value_to_insert)
        return message

    def send_message_to_user(self, userNum, user_element, **message_formatting):
        message_button = self.get_message_button(userNum, user_element)
        message_button.click()
        message = self.get_formatted_message(
            replace_strings=message_formatting)
        self.send_message(message)
        logger.info("send message")
        time.sleep(0.5)
        self.click_x()
        # if self.testing is True:
        #     self.discard_message()

    def send_message_to_users(self, user_elements):
        userNum = 1
        for user_element in user_elements:
            full_name = self.get_full_name(user_element)
            if not self.delivery_tracker.already_delivered(full_name):
                logger.info(f"Sending to {full_name}")
                first_name = full_name.split(" ")[0]
                self.send_message_to_user(
                    userNum, user_element, first_name=first_name)
                self.delivery_tracker.add_user_to_delivered_list(full_name)
            else:
                logger.info(f"Already delivered to {full_name}")
            userNum += 1

    def send_message(self, message):
        msgwin = self.driver.find_element_by_css_selector(
            ".msg-form__contenteditable")
        # msgwin = self.driver.find_element_by_xpath("//button[contains(@class, 'send-button')]")
        msgwin.send_keys(message)
        # element =
        self.driver.find_element_by_xpath(
            "//button[contains(@class, 'send-button')]").submit()
        # self.driver.execute_script("arguments[0].click();", element)
        # click()
        # if self.testing is False:
        #     msgwin.send_keys(Keys.ENTER)

    def discard_message(self):
        self.driver.find_element_by_xpath(
            "//*[contains(span,'Discard')]").click()

    def get_user_elements(self):
        try:
            element_list_container = self.driver.find_element_by_css_selector(
                "#main > div > div > div.ph0.pv2.artdeco-card.mb2 > ul"
            )
            user_list = element_list_container.find_elements_by_css_selector(
                "li")
            return user_list
        except Exception as exc:
            logger.exception("failed to find buttons", exc_info=exc)

    def get_full_name(self, user_element):
        name_info = user_element.find_element_by_partial_link_text("View").text
        name_info_parts = name_info.split("\n")
        if len(name_info_parts) < 2:
            logger.error(f"Seems like we have a problem with '{name_info}")
        full_name = name_info_parts[0]
        full_name = full_name.encode()
        full_name = str(full_name)[2:-1]
        logger.info(f"Found user's name: '{full_name}'")
        return full_name

    def get_message_button(self, userNum, user_element):
        xpathB = "//div/*/ul/li[tempi]/div/*//button"
        number = str(userNum)
        print("number", number)
        xpathB = xpathB.replace("tempi", number)
        print("xpathB:", xpathB)
        return user_element.find_element_by_xpath(xpathB)

    def click_x(self):
        logger.info("click_x")
        try:
            self.driver.find_element_by_xpath(
                "//div[2]/header/section[2]/button[3]").submit()  # ash
        except Exception as exc:
            pass
        try:
            self.driver.find_element_by_xpath(
                "/html/body/div[6]/aside/div[2]/header/section[2]/button[2]").click()
        except Exception as exc:
            pass
        try:
            self.driver.find_element_by_xpath(
                "/html/body/div[6]/aside/div[3]/header/section[2]/button[3]").click()
        except Exception as exc:
            pass
        try:
            self.driver.find_element_by_xpath(
                ".//span[contains(.,'Close your conversation')]").click()
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
    os.makedirs("logs", exist_ok=True)
    delivery_tracker_filename = os.path.join("logs", "delivery_tracker.csv")
    print("delivery_tracker_filename: delivery_tracker_filename:",
          delivery_tracker_filename)
    initialize_logger()
    driver, user_filter, message, num_pages = initialize_linkedin()
    page = UserPage(driver, message, delivery_tracker_filename, testing=False)

    try:
        for i in range(int(num_pages)):
            page_number = i + 1
            logger.info(f"Processing page {page_number}")
            user_elements = page.get_user_elements()
            logger.info(f"Found {len(user_elements)} users on this page")
            if len(user_elements) == 0:
                logger.info(
                    f"No more users on this page. My work here is done")
                break
            page.send_message_to_users(user_elements)
            logger.info("Attempting to go to next page")
            user_filter = get_next_page_url(user_filter)
            apply_filter(driver, user_filter=user_filter)
            time.sleep(1)
    except Exception as exc:
        logger.exception("failed", exc_info=exc)
        driver.get_screenshot_as_file("logs/crash.png")
        # driver.close()
    logger.info("Done")