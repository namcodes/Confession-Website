
const Base_URL = "https://cn-confession.vercel.app/";

export const format_date = (data) => {
  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(data);
  const getMonth = monthNames[date.getMonth()];
  const getYear = date.getFullYear();
  const getDate = date.getDate();
  const formattedDate = `${getMonth} • ${getDate} • ${getYear} `;
  return formattedDate;
};

export const categories = (data) => {
  let category = "";
  switch (data) {
    case "first-experience": {
      category = "• First Experience";
      break;
    }
    case "wild-experience": {
      category = "• Wild Experience";
      break;
    }
    case "lie": {
      category = "• Lie";
      break;
    }
    case "dream": {
      category = "• Dream";
      break;
    }
    case "guilt": {
      category = "• Guilt";
      break;
    }
    case "pain": {
      category = "• Pain";
      break;
    }
    case "truth": {
      category = "• Truth";
      break;
    }
    case "fantacy": {
      category = "• Fantacy";
      break;
    }
    case "random-feeling": {
      category = "• Random Feeling";
      break;
    }

    default: {
      category = "• Others";
      break;
    }
  }
  return category;
};

export const badge = (data) => {
  let badge = "";
  switch (data) {
    case "first-experience": {
      badge = "badge-first-exp";
      break;
    }
    case "wild-experience": {
      badge = "badge-wild-exp";
      break;
    }
    case "lie": {
      badge = "badge-lie";
      break;
    }
    case "dream": {
      badge = "badge-dream";
      break;
    }
    case "guilt": {
      badge = "badge-guilt";
      break;
    }
    case "pain": {
      badge = "badge-pain";
      break;
    }
    case "truth": {
      badge = "badge-truth";
      break;
    }
    case "fantacy": {
      badge = "badge-fantacy";
      break;
    }
    case "random-feeling": {
      badge = "badge-rand-feeling";
      break;
    }
    default: {
      badge = "badge-others";
      break;
    }
  }

  return badge;
};

export const share_facebook = (category, id) => {
  const facebook_url = `https://web.facebook.com/sharer/sharer.php?u=${Base_URL}/category/${category}/${id}`;

  return facebook_url;
};

export const share_twitter = (category, id) => {
  const twitter_url = `https://twitter.com/intent/tweet?url=${Base_URL}/category/${category}/${id}`;

  return twitter_url;
};

export const share_telegram = (category, id) => {
  const telegram_url = `https://twitter.com/intent/tweet?url=${Base_URL}/category/${category}/${id}`;

  return telegram_url;
};

export const copy_link = (category, id) => {
  const copyText = `${Base_URL}/category/${category}/${id}`;
  if (typeof window !== "undefined") {
    if (!navigator.clipboard) {
      var tempInput = document.createElement("input");
      tempInput.value = copyText;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("Copied Successfully");
      return;
    } else {
      navigator.clipboard.writeText(copyText);
      alert("Copied Successfully");
      return;
    }
  }
};

export const validations = (values) => {
  const errors = {};

  if (!values.gender) {
    errors.age = "Please enter your gender.";
  }

  if (!values.category) {
    errors.category = "Please enter your category.";
  }

  if (!values.age) {
    errors.age = "Please enter your age.";
  } else {
  }

  if (!values.confession) {
    errors.confession = "Please enter your confession.";
  }

  return errors;
};

export const bottomScroll = () => {
  if (typeof window !== "undefined") {
    window.addEventListener(
      "scroll",
      (el) => {
        const bottom = window.scrollY + window.innerHeight;
        if (bottom === document.body.scrollHeight) {
          document.body.classList.add("active-footer");
        } else {
          document.body.classList.remove("active-footer");
        }
      }
    );
  }
  return;
}

export const maxContent = (contentText) =>{
  const content = contentText.length > 310 ? `${contentText.substring(0, 310)} ...` : contentText;
  return content;
}
