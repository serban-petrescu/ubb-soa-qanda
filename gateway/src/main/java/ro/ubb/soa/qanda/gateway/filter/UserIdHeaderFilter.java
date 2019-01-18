package ro.ubb.soa.qanda.gateway.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UrlPathHelper;

@Component
public class UserIdHeaderFilter extends ZuulFilter {
	private static final String HEADER_NAME = "X-User-ID";

	@Override
	public String filterType() {
		return "pre";
	}

	@Override
	public int filterOrder() {
		return 0;
	}

	@Override
	public boolean shouldFilter() {
		String path = new UrlPathHelper().getPathWithinApplication(RequestContext.getCurrentContext().getRequest());
		return !path.startsWith("/oauth");
	}

	@Override
	public Object run() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		RequestContext.getCurrentContext().addZuulRequestHeader(HEADER_NAME, auth.getPrincipal().toString());
		return null;
	}
}
